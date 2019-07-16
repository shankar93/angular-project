import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetShipSelectorComponent } from './planet-ship-selector.component';

describe('PlanetShipSelectorComponent', () => {
  let component: PlanetShipSelectorComponent;
  let fixture: ComponentFixture<PlanetShipSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetShipSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetShipSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
