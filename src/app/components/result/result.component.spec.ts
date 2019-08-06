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
    elementCreator('result');
    elementCreator('opac');
    fixture.detectChanges();

  });

  fit('should create', () => {
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
  fit('get timeTaken from service', () => {
    service.timeTaken = 100;
    expect(service.timeTaken).toEqual(100);
  });
});
