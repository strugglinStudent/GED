import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, map, switchMap, take, tap } from 'rxjs';
import { Notification } from './notifications.types';
import { environment } from '../../../../environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);
  private _socket: Socket;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {
    this._socket = io(environment.api);

    // Listen for new notifications
    this._socket.on('newNotification', (notification: Notification) => {
      this.notifications$.pipe(take(1)).subscribe((notifications) => {
        this._notifications.next([...notifications, notification]);
      });
    });

    // Listen for notification updates
    this._socket.on('updateNotification', (updatedNotification: Notification) => {
      this.notifications$.pipe(take(1)).subscribe((notifications) => {
        const index = notifications.findIndex((item) => item.id === updatedNotification.id);
        if (index !== -1) {
          notifications[index] = updatedNotification;
          this._notifications.next(notifications);
        }
      });
    });

    // Listen for notification deletions
    this._socket.on('deleteNotification', (id: string) => {
      this.notifications$.pipe(take(1)).subscribe((notifications) => {
        const index = notifications.findIndex((item) => item.id === id);
        if (index !== -1) {
          notifications.splice(index, 1);
          this._notifications.next(notifications);
        }
      });
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for notifications
   */
  get notifications$(): Observable<Notification[]> {
    return this._notifications.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all notifications
   */
  getAll(): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>(`${environment.api}/notifications`).pipe(
      tap((notifications) => {
        this._notifications.next(notifications);
      }),
    );
  }

  /**
   * Create a notification
   *
   * @param notification
   */
  create(notification: Notification): Observable<Notification> {
    return this.notifications$.pipe(
      take(1),
      switchMap((notifications) =>
        this._httpClient
          .post<Notification>(`${environment.api}/notifications`, { notification })
          .pipe(
            map((newNotification) => {
              // Update the notifications with the new notification
              this._notifications.next([...notifications, newNotification]);

              // Emit the new notification via socket
              this._socket.emit('newNotification', newNotification);

              // Return the new notification from observable
              return newNotification;
            }),
          ),
      ),
    );
  }

  /**
   * Update the notification
   *
   * @param id
   * @param notification
   */
  update(id: string, notification: Notification): Observable<Notification> {
    return this.notifications$.pipe(
      take(1),
      switchMap((notifications) =>
        this._httpClient
          .patch<Notification>(`${environment.api}/notifications`, {
            id,
            notification,
          })
          .pipe(
            map((updatedNotification: Notification) => {
              // Find the index of the updated notification
              const index = notifications.findIndex((item) => item.id === id);

              // Update the notification
              notifications[index] = updatedNotification;

              // Update the notifications
              this._notifications.next(notifications);

              // Emit the update via socket
              this._socket.emit('updateNotification', updatedNotification);

              // Return the updated notification
              return updatedNotification;
            }),
          ),
      ),
    );
  }

  /**
   * Delete the notification
   *
   * @param id
   */
  delete(id: string): Observable<boolean> {
    return this.notifications$.pipe(
      take(1),
      switchMap((notifications) =>
        this._httpClient
          .delete<boolean>(`${environment.api}/notifications`, { params: { id } })
          .pipe(
            map((isDeleted: boolean) => {
              // Find the index of the deleted notification
              const index = notifications.findIndex((item) => item.id === id);

              // Delete the notification
              notifications.splice(index, 1);

              // Update the notifications
              this._notifications.next(notifications);

              // Emit the deletion via socket
              this._socket.emit('deleteNotification', id);

              // Return the deleted status
              return isDeleted;
            }),
          ),
      ),
    );
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): Observable<boolean> {
    return this.notifications$.pipe(
      take(1),
      switchMap((notifications) =>
        this._httpClient.get<boolean>(`${environment.api}/notifications/mark-all-as-read`).pipe(
          map((isUpdated: boolean) => {
            // Go through all notifications and set them as read
            notifications.forEach((notification, index) => {
              notifications[index].read = true;
            });

            // Update the notifications
            this._notifications.next(notifications);

            // Emit the update via socket
            this._socket.emit('markAllAsRead');

            // Return the updated status
            return isUpdated;
          }),
        ),
      ),
    );
  }
}
