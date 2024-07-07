import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('TokenInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptor,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add an Authorization header with a JWT token if the user is authenticated', () => {
    const mockUser = { username: 'testuser' };
    spyOn(authService, 'getUser').and.returnValue(of(mockUser));
    httpClient.get('/api/some-resource').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/api/some-resource');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    req.flush({}); // Respond to the request
    httpTestingController.verify();
  });

  it('should not add an Authorization header if the user is not authenticated', () => {
    spyOn(authService, 'getUser').and.returnValue(of(null));
    httpClient.get('/api/some-resource').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/api/some-resource');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({});
    httpTestingController.verify();
  });
});
