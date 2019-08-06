import { TestBed, inject } from '@angular/core/testing';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DataService } from './data.service';
import { AppModule } from '../app.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';

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
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
  fit('planetFetch', () => {
    const service: DataService = TestBed.get(DataService);
    const planetFetch = service.planetFetch();
    expect(planetFetch);
  });
  fit('vehicleFetch', () => {
    const service: DataService = TestBed.get(DataService);
    const vehicleFetch = service.vehicleFetch();
    expect(vehicleFetch);
  });
  fit('getToken', () => {
    const service: DataService = TestBed.get(DataService);
    const getToken = service.getToken();
    expect(getToken);
  });

  fit('successTimeTaken', () => {
    const service: DataService = TestBed.get(DataService);
    service.findFalconeRequestBody.planet_names = [
      'Donlon',
      'Enchai',
      'Jebing',
      'Sapir'
    ];
    service.planetFound = 'Donlon';
    const successTimeTaken = service.successTimeTaken();
    expect(successTimeTaken);
  });
});
