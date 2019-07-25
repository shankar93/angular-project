import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { SelectedPlanetsModel } from '../models/selected-planets.model';
import { PlanetsModel } from '../models/planets.model';
import { VehiclesModel } from '../models/vehicles.model';
import { FindFalconeModel } from '../models/find-falcone.model';
import { FindResponseModel } from '../models/find-response.model';

// Api endpoint
const API_URL: string = environment.restApi;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // selectedPlanetsData initialized for all the autocompletes
  selectedPlanetsData: Array<SelectedPlanetsModel> = [
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
  planetDistance: Object = {};
  // Object with no of vehicles available
  vehicleCount: Object = {};

  // Stores the vehicles details recieved from Vehicles Api
  vehiclesApiData: VehiclesModel[];
  // Request body for finding falcone Api
  findFalconeRequestBody: FindFalconeModel = {
    token: '',
    planet_names: [],
    vehicle_names: []
  };
  // Boolean to alternate spinner and selector component
  selectorAvailable = true;
  // Behavioral subject to initliaze planets array in planet-ship-selector autocomplete
  planetsList = new BehaviorSubject<Number>(0);
  // Behavioral subject to disable selected planets in other dropdowns
  selectedPlanets = new BehaviorSubject<Array<SelectedPlanetsModel>>(
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
  vehiclesTimeArray: Array<number> = [];
  // If success time taken to reach the planet found
  timeTaken: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  // Returns the planets and their distances from the planets Api
  planetFetch(): Observable<Array<PlanetsModel>> {
    return this.httpClient.get<Array<PlanetsModel>>(`${API_URL}/planets`);
  }
  // Returns the vehicles and their details from the vehicles Api
  vehicleFetch(): Observable<Array<VehiclesModel>> {
    return this.httpClient.get<Array<VehiclesModel>>(`${API_URL}/vehicles`);
  }
  // Fetches the token and calls the launchVehicles Api
  getToken(): Observable<{ token: string }> {
    // Display the spinner while data is getting retrieved
    this.spinner.show();
    return this.httpClient.post<{ token: string }>(
      `${API_URL}/token`,
      '',
      this.getTokenHeaders
    );
  }

  launchVehiclesApi(): Observable<FindResponseModel> {
    console.log(this.findFalconeRequestBody);
    return this.httpClient.post<FindResponseModel>(
      `${API_URL}/find`,
      this.findFalconeRequestBody,
      this.findApiHeaders
    );
  }
  // If success to display the time taken in result component
  successTimeTaken(): void {
    this.findFalconeRequestBody.planet_names.forEach((planet, index) => {
      console.log('pv', this.planetFound, planet);
      if (this.planetFound === planet) {
        this.timeTaken = this.vehiclesTimeArray[index];
        console.log('timeTaken', this.timeTaken);
      }
    });
  }
  // Uses navigation to reload the component
  duplicateNavigation(): void {
    this.router.navigate(['/home']);
  }
  // Sets selectedPlanets behavioural subject to initial state
  reset(): void {
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
