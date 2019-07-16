import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { SelectedPlanets } from '../models/selected-planets.model';
import { Planets } from '../models/planets.model';
import { Vehicles } from '../models/vehicles.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // selectedPlanetsData initialized for all the autocompletes
  selectedPlanetsData = [
    {
      Donlon: false,
      Enchai: false,
      Jebing: false,
      Sapir: false,
      Lerbin: false,
      Pingasor: false
    },
    {
      Donlon: false,
      Enchai: false,
      Jebing: false,
      Sapir: false,
      Lerbin: false,
      Pingasor: false
    },
    {
      Donlon: false,
      Enchai: false,
      Jebing: false,
      Sapir: false,
      Lerbin: false,
      Pingasor: false
    },
    {
      Donlon: false,
      Enchai: false,
      Jebing: false,
      Sapir: false,
      Lerbin: false,
      Pingasor: false
    }
  ];
  // Behavioral subject to disable selected planets in other dropdowns
  selectedPlanets = new BehaviorSubject<Array<SelectedPlanets>>(
    this.selectedPlanetsData
  );
  // Object with planet names and distances
  planetDistance = {};
  // Object with no of vehicles available
  vehicleCount = {};
  // Behavioral subject to alter no of vehicles available
  selectedVehicles = new BehaviorSubject(this.vehicleCount);
  //
  vehiclesApiData: Vehicles[];

  findFalconeRequestBody = { token: '', planet_names: [], vehicle_names: [] };

  getTokenHeaders = {
    headers: new HttpHeaders({
      Accept: 'application/json'
    })
  };
  findApiHeaders = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };
  disableLaunchButton: Boolean = true;
  //
  planetFound: String = '';
  // count of number of visits of the home component
  homeCountFlag = 0;
  vehiclesTimeArray: any = [];
  timeTaken: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  planetFetch() {
    return this.httpClient.get<Array<Planets>>(
      'https://findfalcone.herokuapp.com/planets'
    );
  }

  vehicleFetch() {
    return this.httpClient.get<Array<Vehicles>>(
      'https://findfalcone.herokuapp.com/vehicles'
    );
  }

  getToken() {
    this.httpClient
      .post<{ token: string }>(
        'https://findfalcone.herokuapp.com/token',
        '',
        this.getTokenHeaders
      )
      .subscribe(data => {
        console.log(data.token);
        this.findFalconeRequestBody.token = data.token;
        this.launchVehiclesApi();
      });
  }

  launchVehiclesApi() {
    this.spinner.show();
    console.log(this.findFalconeRequestBody);
    return this.httpClient
      .post<{ planet_name: string; status: string }>(
        'https://findfalcone.herokuapp.com/find',
        this.findFalconeRequestBody,
        this.findApiHeaders
      )
      .subscribe(data => {
        if (data.status === 'success') {
          this.planetFound = data.planet_name;
          this.successTimeTaken();
        }
        console.log('timetaken1', this.timeTaken);
        // redirecting to result page after launch
        this.router.navigate(['/result']);
        // emptying planet,vehicle arrays to try again
        this.findFalconeRequestBody.planet_names = [];
        this.findFalconeRequestBody.vehicle_names = [];
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }

  successTimeTaken() {
    this.findFalconeRequestBody.planet_names.forEach((planet, index) => {
      console.log('pv', this.planetFound, planet);
      if (this.planetFound === planet) {
        this.timeTaken = this.vehiclesTimeArray[index];
        console.log('timeTaken', this.timeTaken);
      }
    });
  }

  duplicateNavigation() {
    // Uses navigation to reload the component
    this.router
      .navigateByUrl('/result', { skipLocationChange: true })
      .then(() => this.router.navigate(['/home']));
  }
  reset() {
    // Sets selectedPlanetData to its initial state
    this.selectedPlanetsData = [
      {
        Donlon: false,
        Enchai: false,
        Jebing: false,
        Sapir: false,
        Lerbin: false,
        Pingasor: false
      },
      {
        Donlon: false,
        Enchai: false,
        Jebing: false,
        Sapir: false,
        Lerbin: false,
        Pingasor: false
      },
      {
        Donlon: false,
        Enchai: false,
        Jebing: false,
        Sapir: false,
        Lerbin: false,
        Pingasor: false
      },
      {
        Donlon: false,
        Enchai: false,
        Jebing: false,
        Sapir: false,
        Lerbin: false,
        Pingasor: false
      }
    ];
    this.selectedPlanets.next(this.selectedPlanetsData);
    // disables the launch button
    this.disableLaunchButton = true;
  }
}
