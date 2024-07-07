import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiErrorsInterceptor } from './api-errors.interceptor';
import { SnackBarService } from '../services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ErrorHandlerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiErrorsInterceptor,
          multi: true,
        },
        MatSnackBar,
        SnackBarService,
      ],
    }),
  );

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // Finally, assert that there are no outstanding requests.
    httpMock.verify();
  }));

  it('should catchErrors when httpMock flush Error', fakeAsync(
    inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        const snackBarService: SnackBarService = TestBed.inject(SnackBarService);

        const spy = spyOn(snackBarService, 'openSnackBar');
        // http call
        http.get('/test').subscribe(
          () => {
            // do nothing
          },
          () => {
            // do nothing
          },
        );

        const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({ status: 503 });
        // flush the http call with mockErrorResponse
        httpMock.expectOne('/test').flush({}, mockErrorResponse);
        // wait the http call
        tick(50);

        expect(spy).toHaveBeenCalledWith('503 Service problem');
      },
    ),
  ));
  it('should catchErrors when httpMock flush Error when status null', fakeAsync(
    inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        const snackBarService: SnackBarService = TestBed.inject(SnackBarService);

        const spy = spyOn(snackBarService, 'openSnackBar');
        // http call
        http.get('/test').subscribe(
          () => {
            // do nothing
          },
          () => {
            // do nothing
          },
        );

        const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({ status: undefined });
        // flush the http call with mockErrorResponse
        httpMock.expectOne('/test').flush({}, mockErrorResponse);
        // wait the http call
        tick(50);

        expect(spy).toHaveBeenCalledWith(' Service problem');
      },
    ),
  ));
  it('should catchErrors when httpMock flush Error 403', fakeAsync(
    inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        const snackBarService: SnackBarService = TestBed.inject(SnackBarService);

        const spy = spyOn(snackBarService, 'openSnackBar');
        // http call
        http.get('/test').subscribe(
          () => {
            // do nothing
          },
          () => {
            // do nothing
          },
        );

        const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({ status: 403 });
        // flush the http call with mockErrorResponse
        httpMock.expectOne('/test').flush({}, mockErrorResponse);
        // wait the http call
        tick(403);

        expect(spy).toHaveBeenCalledWith('Not authorized');
      },
    ),
  ));
  it('should catchErrors when httpMock flush Error 404', fakeAsync(
    inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        const snackBarService: SnackBarService = TestBed.inject(SnackBarService);

        const spy = spyOn(snackBarService, 'openSnackBar');
        // http call
        http.get('/test').subscribe(
          () => {
            // do nothing
          },
          () => {
            // do nothing
          },
        );

        const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({ status: 404 });
        // flush the http call with mockErrorResponse
        httpMock.expectOne('/test').flush({}, mockErrorResponse);
        // wait the http call
        tick(404);

        expect(spy).toHaveBeenCalledWith('404 Not found');
      },
    ),
  ));
  it('should catchErrors when httpMock flush Error 400', fakeAsync(
    inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        const snackBarService: SnackBarService = TestBed.inject(SnackBarService);

        const spy = spyOn(snackBarService, 'openSnackBar');
        // http call
        http.get('/test').subscribe(
          () => {
            // do nothing
          },
          () => {
            // do nothing
          },
        );

        const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({ status: 400 });
        // flush the http call with mockErrorResponse
        httpMock.expectOne('/test').flush({}, mockErrorResponse);
        // wait the http call
        tick(50);

        expect(spy).toHaveBeenCalledWith('400 Bad request');
      },
    ),
  ));
});
