/*import { TestBed, fakeAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { of, throwError } from 'rxjs';
import { ISignUpResult } from '../models/iSignUpResult';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call amplify configure when init service', fakeAsync(() => {
    const spy = spyOn(service.amplify, 'configure');
    service.initConfig();
    expect(spy).toHaveBeenCalledTimes(1);
  }));
  it('should call signUp() with user email and password', () => {
    const user: User = {
      userName: 'test@gmail.com',
      password: 'password123',
      email: 'test@gmail.com',
    };
    const spy = spyOn(service.auth, 'signUp').and.returnValue(Promise.resolve({} as ISignUpResult));
    service.signUp(user);
    expect(spy).toHaveBeenCalledWith({
      username: user.userName,
      password: user.password,
      attributes: { email: 'test@gmail.com' },
      autoSignIn: { enabled: true },
    });
  });
  it('should send update user mode', () => {
    const app = { darkMode: true };
    const id = '1111';
    service.userDarkMode(app, id).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://api-dev.fanswaves.com/user-service/api/v1/users/1111');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ app });
    req.flush(null);
  });
  it('should call Auth.confirmSignUp with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'confirmSignUp').and.returnValue(Promise.resolve({} as any));

    const user = { userName: 'test4896', code: '123456' };
    await service.confirmSignUp(user).subscribe(() => {
      expect(spy).toHaveBeenCalledWith(user.userName, user.code, { forceAliasCreation: false });
    });
  });
  it('should call Auth.resendSignUp with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'resendSignUp').and.returnValue(Promise.resolve({} as any));

    const user = { userName: 'test4896' };
    await service.resendConfirmationCode(user).subscribe(() => {
      expect(spy).toHaveBeenCalledWith(user.userName);
    });
  });
  it('should call Auth.forgotPassword with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'forgotPassword').and.returnValue(Promise.resolve({} as any));
    const email = 'test@emailcom';
    await service.forgotPassword(email).subscribe(() => {
      expect(spy).toHaveBeenCalledWith(email);
    });
  });
  it('should call Auth.confirmForgotPassword with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'forgotPasswordSubmit').and.returnValue(
      Promise.resolve({} as any),
    );
    const email = 'test@emailcom';
    const otp = '123456';
    const newPassword = 'Test123.';
    await service.confirmForgotPassword(email, otp, newPassword).subscribe(() => {
      expect(spy).toHaveBeenCalledWith(email, otp, newPassword);
    });
  });
  it('should call Auth.changePassword with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'changePassword').and.returnValue(Promise.resolve({} as any));
    const token = 'test';
    const previousPassword = '123456';
    const newPassword = 'Test123.';
    await service.changePassword(token, previousPassword, newPassword).subscribe(() => {
      expect(spy).toHaveBeenCalledWith(token, previousPassword, newPassword);
    });
  });
  it('should call Auth.signIn with the correct parameters and set authenticationSubject to true', async () => {
    const user: User = { email: 'test@example.com', password: 'password123' };
    const signInResult = { userConfirmed: true };
    const spy = spyOn(service.auth, 'signIn').and.returnValue(Promise.resolve(signInResult));
    await service.signIn(user);
    expect(spy).toHaveBeenCalledWith(user.email, user.password);
    expect(service.authenticationSubject.value).toBeTrue();
  });
  it('should call Auth.signOut and set authenticationSubject to false', async () => {
    const signOutResult = { userConfirmed: false };
    const spy = spyOn(service.auth, 'signOut').and.returnValue(Promise.resolve(signOutResult));
    await service.signOut();
    expect(spy).toHaveBeenCalled();
    expect(service.authenticationSubject.value).toBeFalse();
  });
  it('should call Auth.deleteUser ', async () => {
    const spy = spyOn(service.auth, 'deleteUser').and.returnValue(Promise.resolve({} as any));
    await service.deleteUser();
    expect(spy).toHaveBeenCalled();
  });
  it('should return user information', async () => {
    const mockUser = { username: 'testuser' };
    const spy = spyOn(service.auth, 'currentUserInfo').and.returnValue(Promise.resolve(mockUser));

    await service.getUser();
    expect(spy).toHaveBeenCalled();
  });
  it('should return currentAuthenticatedUser information', async () => {
    const mockUser = { username: 'testuser' };
    const spy = spyOn(service.auth, 'currentAuthenticatedUser').and.returnValue(
      Promise.resolve(mockUser),
    );

    await service.currentAuthenticatedUser();
    expect(spy).toHaveBeenCalled();
  });
  it('should update the current user', async () => {
    // Arrange
    const user: User = {
      name: 'test',
      email: 'test@test.com',
    };
    const cognitoUser = { username: 'test@test.com' };
    const spyCurrentUserPoolUser = spyOn(service.auth, 'currentUserPoolUser').and.returnValue(
      Promise.resolve(cognitoUser),
    );
    const spyUpdateUserAttributes = spyOn(service.auth, 'updateUserAttributes').and.returnValue(
      Promise.resolve('test'),
    );
    await service.updateUser(user);
    expect(spyCurrentUserPoolUser).toHaveBeenCalled();
    expect(spyUpdateUserAttributes).toHaveBeenCalledWith(cognitoUser, user);
  });
  it('should return true if user is authenticated', () => {
    service.authenticationSubject.next(true);
    service.isAuthenticated().subscribe((result) => {
      expect(result).toBeTrue();
    });
  });
  it('should return false if user is not authenticated', () => {
    service.authenticationSubject.next(false);
    spyOn(service, 'getUser').and.returnValue(of(null));
    service.isAuthenticated().subscribe((result) => {
      expect(result).toBeFalse();
    });
  });
  it('should return false if getUser() throw error', () => {
    service.authenticationSubject.next(false);
    spyOn(service, 'getUser').and.returnValue(throwError(() => new Error()));
    service.isAuthenticated().subscribe((result) => {
      expect(result).toBeFalse();
    });
  });

  it('should call Auth.googleSocialSignIn with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'federatedSignIn').and.returnValue(Promise.resolve({} as any));
    await service.googleSocialSignIn().subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
  it('should call Auth.facebookSocialSignIn with the correct parameters', async () => {
    const spy = spyOn(service.auth, 'federatedSignIn').and.returnValue(Promise.resolve({} as any));
    await service.facebookSocialSignIn().subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
  it('should decode a valid token and return the user object', () => {
    // Arrange
    const mockToken = 'your-mock-token';

    // Act
    const result = service.decodeToken(mockToken);

    // Assert
    expect(result).toEqual(null);
  });

  it('should get current user', () => {
    service.getCurrentUser().subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://api-dev.fanswaves.com/user-service/api/v1/users/current',
    );
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
  it('should get user by id', () => {
    service.getUserById('u1').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://api-dev.fanswaves.com/user-service/api/v1/users/shares/u1',
    );
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should send update user info', () => {
    const user = { id: 'u#1111', fan: { name: 'test' } };
    service.updatePersonalInfo(user, 'info').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://api-dev.fanswaves.com/user-service/api/v1/users/1111');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ fan: user.fan });
    req.flush(null);
  });

  it('should send update user image', () => {
    const data: FormData = new FormData();
    service.updateMyImage(data).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://api-dev.fanswaves.com/user-service/api/v1/users/images/upload',
    );
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should send selected preferences', () => {
    const dummySelected = ['preference1', 'preference2'];

    service.sendPreferences(dummySelected, '5455454').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://api-dev.fanswaves.com/user-service/api/v1/users/5455454',
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ preferences: { selected: dummySelected } });
    req.flush(null);
  });

  it('should send selected preferences', () => {
    const dummySelected = ['preference1', 'preference2'];

    service.sendPreferences(dummySelected, '5455454').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(
      'https://api-dev.fanswaves.com/user-service/api/v1/users/5455454',
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ preferences: { selected: dummySelected } });
    req.flush(null);
  });

  it('should send update user info when we update stat', () => {
    const user = { id: 'u#1111', fan: { name: 'test', statistics: {} } };
    service.updatePersonalInfo(user, 'stat').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://api-dev.fanswaves.com/user-service/api/v1/users/1111');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ fan: { statistics: user.fan.statistics } });
    req.flush(null);
  });

  it('should send update user info when we update social network (without www prefix)', () => {
    const user = {
      id: 'u#1111',
      fan: {
        name: 'test',
        socialNetworks: {
          youtube: 'httpS://YOUtube.Com/fans',
          snapchat: 'httpS://Snapchat.Com/fans',
          tikTok: 'httpS://Tiktok.Com/fans',
          twitter: 'httpS://Twitter.Com/fans',
          instagram: 'httpS://Instagram.Com/fans',
          facebook: 'httpS://Facebook.Com/fans',
        },
      },
    };
    service.updatePersonalInfo(user, 'social').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://api-dev.fanswaves.com/user-service/api/v1/users/1111');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      fan: {
        socialNetworks: {
          youtube: 'https://youtube.com/fans',
          snapchat: 'https://snapchat.com/fans',
          tikTok: 'https://tiktok.com/fans',
          twitter: 'https://twitter.com/fans',
          instagram: 'https://instagram.com/fans',
          facebook: 'https://facebook.com/fans',
        },
      },
    });
    req.flush(null);
  });

  it('should send update user info when we update social network (with www prefix)', () => {
    const user = {
      id: 'u#1111',
      fan: {
        name: 'test',
        socialNetworks: {
          youtube: 'httpS://Www.YOUtube.Com/fans',
          snapchat: 'httpS://Www.Snapchat.Com/fans',
          tikTok: 'httpS://Www.Tiktok.Com/fans',
          twitter: 'httpS://Www.Twitter.Com/fans',
          instagram: 'httpS://Www.Instagram.Com/fans',
          facebook: 'httpS://Www.Facebook.Com/fans',
        },
      },
    };
    service.updatePersonalInfo(user, 'social').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://api-dev.fanswaves.com/user-service/api/v1/users/1111');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      fan: {
        socialNetworks: {
          youtube: 'https://www.youtube.com/fans',
          snapchat: 'https://www.snapchat.com/fans',
          tikTok: 'https://www.tiktok.com/fans',
          twitter: 'https://www.twitter.com/fans',
          instagram: 'https://www.instagram.com/fans',
          facebook: 'https://www.facebook.com/fans',
        },
      },
    });
    req.flush(null);
  });
});
*/
