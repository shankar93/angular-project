import { TestBed, inject } from '@angular/core/testing';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DataService } from './data.service';
import { AppModule } from '../app.module';

describe('DataService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: XHRBackend, useClass: MockBackend }]
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
  fit('launchVehiclesApi', () => {
    const service: DataService = TestBed.get(DataService);
    const launchVehiclesApi = service.launchVehiclesApi();
    expect(launchVehiclesApi);
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
  /* fit('planetFetch', () => {
    inject([DataService, XHRBackend], (dataService, mockBackend) => {
      const mockResponse = {
        planet_name: 'Donlon',
        status: 'success'
      };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(mockResponse);
      });
      dataService.planetFetch.subscribe(data => {
        expect(data.length).toBe(6);
        expect(data[0].name).toBe('Donlon');
      });
    });
  }); */
});
