import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { retry, catchError } from 'rxjs/operators';
import {
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

describe('DataService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        }
      ]
    })
  );

  fit('should be created', () => {
    const httpErrorInterceptor: HttpErrorInterceptor = TestBed.get(
      HttpErrorInterceptor
    );
    expect(httpErrorInterceptor).toBeTruthy();
  });

  /* fit('should be created', () => {
    const httpErrorInterceptor: HttpErrorInterceptor = TestBed.get(
      HttpErrorInterceptor
    );
    const errorMessage = `Error: The server did not send proper response`;
    const request: HttpRequest<any> = new HttpRequest<any>('GET', ``);
    const err: any = { status: 500 };
    const next: any = {
      handle: (request: HttpRequest<any>) => ({
        catch: (callback: Function) => callback(err)
      })
    };
    const interceptor = httpErrorInterceptor.intercept(request, next);
    expect(interceptor instanceof HttpErrorInterceptor).toBe(true, 'instance of Observable');
  }); */
});
