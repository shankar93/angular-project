import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppModule } from '../../app.module';
import { DataService } from '../../services/data.service';
import { XHRBackend } from '@angular/http';
import { of } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DataService);
    const elementsObj = {};
    function elementCreator(element) {
      document.getElementById = jasmine
        .createSpy(element)
        // tslint:disable-next-line:no-shadowed-variable
        .and.callFake(function(element) {
          if (!elementsObj[element]) {
            const newElement = document.createElement('div');
            elementsObj[element] = newElement;
          }
          return elementsObj[element];
        });
    }
    elementCreator('header');
    elementCreator('footer');
    elementCreator('home');
    elementCreator('opac');
  });
  fit('should create', () => {
    service.homeCountFlag = 2;
    component.planetDataFetcher();
    component.vehicleDataFetcher();
    component.launchVehicles();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  fit('planetFetch', () => {
    spyOn(service, 'planetFetch').and.returnValues(
      of([
        {
          name: 'Donlon',
          distance: 100
        },
        {
          name: 'Enchai',
          distance: 200
        },
        {
          name: 'Jebing',
          distance: 300
        },
        {
          name: 'Sapir',
          distance: 400
        },
        {
          name: 'Lerbin',
          distance: 500
        },
        {
          name: 'Pingasor',
          distance: 600
        }
      ])
    );
    component.planetDataFetcher();
    expect(component.planets[0]).toEqual('Donlon');
  });

  fit('displayNextSelector', () => {
    component.displayNextSelector(1);
    expect(component.displayPlanetShipSelector[1]).toBeTruthy();
  });

  fit('vehicleDataFetcher error response', () => {
    spyOn(service, 'planetFetch').and.returnValues('404 not found');
    sessionStorage.setItem('reloadCount', '0');
    expect(sessionStorage.getItem('reloadCount')).toEqual('0');
  });

  fit('launchVehicles', () => {
    spyOn(service, 'getToken').and.returnValues(of({status: 'success', planet_name: 'Donlon'}));
    component.launchVehicles();
    expect(service.planetFound).toEqual('Donlon');
  });
});

/* fit('vehicleFetch', () => {
  inject([DataService, XHRBackend], (dataService, mockBackend) => {
    const mockResponse = [
      {
        name: 'Space pod',
        total_no: 2,
        max_distance: 200,
        speed: 2
      },
      {
        name: 'Space rocket',
        total_no: 1,
        max_distance: 300,
        speed: 4
      },
      {
        name: 'Space shuttle',
        total_no: 1,
        max_distance: 400,
        speed: 5
      },
      {
        name: 'Space ship',
        total_no: 2,
        max_distance: 600,
        speed: 10
      }
    ];
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(mockResponse);
    });
    dataService.planetFetch.subscribe(data => {
      expect(data.length).toBe(4);
      expect(data[0].name).toBe('Space pod');
    });
  });
}); */
