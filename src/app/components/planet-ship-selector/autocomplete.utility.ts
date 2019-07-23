import { Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
// import { SelectedPlanets } from '../../models/selected-planets.model';

export class AutocompleteUtility {
  // Reactive form controls for planet,vehicle selector
  planetAutoComplete = new FormControl('');
  vehicle = new FormControl();
  // Array to store planets from planets API
  planets: Array<string> = [];
  // Array to store distances from planets API
  // distances: Array<Number> = [];
  // Observable to filter the options in auto complete
  filteredOptions: Observable<string[]>;
  // Checks second atttempt to change in autocomplete
  secondAttemptFlag: any;

  // To check if data is available from API
  dataAvailable = false;
  // Input variable from home.component with planet-ship-selector instances
  @Input() planetInstance: any;
  // Event variable to home.component to display next planet-ship-selector
  @Output() displayNextInstance = new EventEmitter<boolean>();
  // value changes if radio selection is changed
  secondRadioCheck = '';
  // Object for vehicles count
  allVehicles = {};
  // Array with units of vehicles
  vehicle_units = [];
  //
  vehicleSpeed: number;
  //
  timeTaken: number;
  //
  secondPush: String = '';
  vehicleNamesExist: Boolean = false;

  constructor(public dataService: DataService) {}

  /*------------------------------------ AUTO COMPLETE CODE -------------------------------*/
  // Subscribed to selectedPlanets Behavioural subject
  selectedPlanetsSubscribe() {
    this.dataService.selectedPlanets.subscribe(data => {
      this.dataService.selectedPlanetsData = data;
      console.log(this.dataService.selectedPlanetsData);
    });
  }
  // Fetch planets and distances from planets API
  planetDataFetcher() {
    this.dataAvailable = true;
    this.dataService.planetFetch().subscribe(allPlanets => {
      if (allPlanets) {
        for (const planet of allPlanets) {
          this.planets.push(planet.name);
          // this.distances.push(planet.distance);
          this.dataService.planetDistance[planet.name] = planet.distance;
        }
        console.log(this.dataService.planetDistance);
        this.dataAvailable = false;
        // To display filtered options from input in autocomplete
        this.filteredOptions = this.planetAutoComplete.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
      console.log(this.planets);
    });
  }
  // Helper method to filter options
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.planets.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  // Called on change in planet selected in autocomplete
  planetSelection(event) {
    // Change the disabled option if choosing for second time in the autocomplete
    this.secondAttempt(event);
    // Disable selected planets in other autocomplete
    this.selectedOptionDisable(event);
    // Enable radio group of selected autocomplete
    this.vehicle.enable();
  }
  // Change the disabled option if choosing for second time in the autocomplete
  secondAttempt(event) {
    if (this.secondAttemptFlag && this.secondAttemptFlag !== this.planetAutoComplete.value) {
      for (let i = 0; i < this.dataService.selectedPlanetsData.length; i++) {
        this.dataService.selectedPlanetsData[i][this.secondAttemptFlag] = false;
      }
      this.vehicle.reset();
      this.vehicleSpeed = 0;
      this.timeTaken = 0;
      this.dataService.findFalconeRequestBody.vehicle_names[this.planetInstance] = null;
      console.log('null', this.dataService.findFalconeRequestBody.vehicle_names[this.planetInstance]);
      this.dataService.selectedPlanets.next(
        this.dataService.selectedPlanetsData
      );


      const vehicleArrayLength =
      this.dataService.findFalconeRequestBody.vehicle_names.length === 4;
      this.vehicleNamesExist = this.dataService.findFalconeRequestBody.vehicle_names.every(
        vehicle => {
          // tslint:disable-next-line:triple-equals
          console.log('null check', vehicle, Boolean(vehicle) == true);
          return Boolean(vehicle) === true;
        }
      );
      this.dataService.disableLaunchButton =
      !(vehicleArrayLength && this.vehicleNamesExist);

    }
    this.secondAttemptFlag = event.option.value;
  }
  // Disable selected planets in other autocomplete
  selectedOptionDisable(event) {
    const selectedPlanet = event.option.value;
    for (let i = 0; i < this.dataService.selectedPlanetsData.length; i++) {
      if (this.planetInstance !== i) {
        this.dataService.selectedPlanetsData[i][selectedPlanet] = true;
      }
    }
    this.dataService.selectedPlanets.next(this.dataService.selectedPlanetsData);
  }
  // Returns a boolean if particular option needs to be disabled or not
  disableCheck(option) {
    return this.dataService.selectedPlanetsData[this.planetInstance][option];
  }
  /*------------------------------------ AUTO COMPLETE CODE ENDS-------------------------------*/
}
