import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectedPlanets } from '../models/selected-planets.model';
import { Planets } from '../models/planets.model';
import { Vehicles } from '../models/vehicles.model';

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
  // Object with planet names and distances
  planetDistance = {};
  // Object with no of vehicles available
  vehicleCount = {};

  // Stores the vehicles details recieved from Vehicles Api
  vehiclesApiData: Vehicles[];
  // Request body for finding falcone Api
  findFalconeRequestBody = { token: '', planet_names: [], vehicle_names: [] };

  // Behavioral subject to disable selected planets in other dropdowns
  selectedPlanets = new BehaviorSubject<Array<SelectedPlanets>>(
    this.selectedPlanetsData
  );
  // Behavioral subject to alter no of vehicles available
  selectedVehicles = new BehaviorSubject(this.vehicleCount);
  // Headers data for the getToken Api
  getTokenHeaders = {
    headers: new HttpHeaders({
      Accept: 'application/json'
    })
  };
  // Headers data for the finding falcone Api
  findApiHeaders = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };
  // variable to disable/enable launch button
  disableLaunchButton: Boolean = true;
  // If success name of the planet found
  planetFound: String = '';
  // count of number of visits of the home component
  homeCountFlag = 0;
  // Array to store the time taken by vehicles selected
  vehiclesTimeArray: any = [];
  // If success time taken to reach the planet found
  timeTaken: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  // Returns the planets and their distances from the planets Api
  planetFetch() {
    return this.httpClient.get<Array<Planets>>(
      'https://findfalcone.herokuapp.com/planets'
    );
  }
  // Returns the vehicles and their details from the vehicles Api
  vehicleFetch() {
    return this.httpClient.get<Array<Vehicles>>(
      'https://findfalcone.herokuapp.com/vehicles'
    );
  }
  // Fetches the token and calls the launchVehicles Api
  getToken(): void {
    // Display the spinner while data is getting retrieved
    this.spinner.show();
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
        // Hiding the loader on successfully receiving data
        setTimeout(() => this.spinner.hide(), 1000);
      });
  }
  // If success to display the time taken in result component
  successTimeTaken() {
    this.findFalconeRequestBody.planet_names.forEach((planet, index) => {
      console.log('pv', this.planetFound, planet);
      if (this.planetFound === planet) {
        this.timeTaken = this.vehiclesTimeArray[index];
        console.log('timeTaken', this.timeTaken);
      }
    });
  }
  // Uses navigation to reload the component
  duplicateNavigation() {
    this.router
      .navigateByUrl('/result', { skipLocationChange: true })
      .then(() => this.router.navigate(['/home']));
  }
  // Sets selectedPlanets behavioural subject to initial state
  reset() {
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
