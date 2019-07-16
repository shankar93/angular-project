import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from '../services/data.service';
// import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve() {
    console.log('resolve');
    // return this.dataService.getToken() && this.dataService.launchVehiclesApi();

    // .catch(() => {
    //   return Observable.of('data not available at this time');
    // });
  }
}
