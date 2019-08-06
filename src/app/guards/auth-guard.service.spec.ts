import { TestBed} from '@angular/core/testing';
import { AppModule } from '../app.module';
import { AuthGuard } from './auth-guard.service';
import { DataService } from '../services/data.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('DataService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: []
    })
  );

  fit('should be created', () => {
    const authGuard: AuthGuard = TestBed.get(AuthGuard);
    expect(authGuard).toBeTruthy();
  });
  fit('canActivate return true', () => {
    const authGuard: AuthGuard = TestBed.get(AuthGuard);
    const service: DataService = TestBed.get(DataService);
    const next: ActivatedRouteSnapshot = null;
    const state: RouterStateSnapshot = null;
    service.findFalconeRequestBody.token = 'token';
    const auth = authGuard.canActivate(next, state);
    expect(auth).toEqual(true);
  });

  fit('canActivate return false', () => {
    const authGuard: AuthGuard = TestBed.get(AuthGuard);
    const service: DataService = TestBed.get(DataService);
    const next: ActivatedRouteSnapshot = null;
    const state: RouterStateSnapshot = null;
    service.findFalconeRequestBody.token = '';
    const auth = authGuard.canActivate(next, state);
    expect(auth).toEqual(false);
  });
});
