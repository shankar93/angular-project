import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { AppModule } from '../../app.module';
import { DataService } from '../../services/data.service';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let service: DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(DataService);
    /* const mockHeader = document.createElement('div');
    mockHeader.id = 'header';
    document.getElementById = jasmine
      .createSpy('header')
      .and.returnValue(mockHeader);
    const mockFooter = document.createElement('div');
    mockFooter.id = 'footer';
    document.getElementById = jasmine
      .createSpy('footer')
      .and.returnValue(mockFooter); */

    const elementsObj = {};
    function elementCreator(element) {
      document.getElementById = jasmine
        .createSpy(element)
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
    /* elementCreator('result');
    elementCreator('opac'); */
    fixture.detectChanges();

  });

  fit('should create', () => {
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });
  fit('responsive function called', () => {
    const responsive = component.responsive();
    expect(responsive);
  });

  fit('reset function called', () => {
    const reset = component.reset();
    expect(reset);
  });
  fit('get timeTaken from service', fakeAsync(() => {
    service.timeTaken = 100;
    tick();
    expect(service.timeTaken).toEqual(100);
  }));
});
