import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PlanetShipSelectorComponent } from './planet-ship-selector.component';

describe('PlanetShipSelectorComponent', () => {
  let component: PlanetShipSelectorComponent;
  let fixture: ComponentFixture<PlanetShipSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanetShipSelectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetShipSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('planetSelection', () => {
    const inputElement = fixture.nativeElement.querySelector('#autocomplete');
    inputElement.focus();
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); });
  });

  /* fit('planetFetch', () => {
    inject([DataService, XHRBackend], (dataService, mockBackend) => {
      const mockResponse = [
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
      ];
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
