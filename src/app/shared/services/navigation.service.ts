import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  navigateToWithParams(url: string, params: any): void {
    this.router.navigate([url], { queryParams: params });
  }

  getCurrentUrl(): string {
    return this.router.url;
  }
}
