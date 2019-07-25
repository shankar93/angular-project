import { Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

export class AutocompleteUtility {
  // Reactive form controls for planet,vehicle selector
  planetAutoComplete = new FormControl('');
  vehicle = new FormControl();
  /*
    // Array to store planets from planets API
    planets: Array<string> = [];
   */
  // Array to store distances from planets API
  filteredOptions: Observable<string[]>;
  // Checks second atttempt to change in autocomplete
  secondAttemptFlag: any;
  // To check if data is available from API
  dataAvailable = false;
  // Input variable from home.component with planets names
  @Input() planets: string[];
  // Input variable from home.component with planet-ship-selector instances
  @Input() planetInstance: any;
  // Event variable to home.component to display next planet-ship-selector
  @Output() displayNextInstance = new EventEmitter<boolean>();
  // value changes if radio selection is changed
  secondRadioCheck;
  String = '';
  // Object for vehicles count
  allVehicles: object = {};
  // Array with units of vehicles
  // vehicle_units = [];
  // To store the speed of vehicle and display in table
  vehicleSpeed: number;
  // To store the time taken to reach destination and display in table
  timeTaken: number;
  // Flag to check if all the vehicles exist
  vehicleNamesExist: Boolean = false;

  constructor(public dataService: DataService) {}

  /*------------------------------------ AUTO COMPLETE CODE -------------------------------*/
  // Subscribed to selectedPlanets Behavioural subject
  selectedPlanetsSubscribe(): void {
    this.dataService.selectedPlanets.subscribe(data => {
      this.dataService.selectedPlanetsData = data;
      console.log(this.dataService.selectedPlanetsData);
    });
  }
  // Initilazes autocomplete when data is recieved from planets Api
  autoCompleteInitializer(): void {
    this.filteredOptions = this.planetAutoComplete.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  // Helper method to filter options
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.planets.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  // Called on change in planet selected in autocomplete
  planetSelection(event: MatAutocompleteSelectedEvent): void {
    // Change the disabled option if choosing for second time in the autocomplete
    this.secondAttempt(event);
    // Disable selected planets in other autocomplete
    this.selectedOptionDisable(event);
    // Enable radio group of selected autocomplete
    this.vehicle.enable();
  }
  // Change the disabled options if choosing for second time in the autocomplete
  secondAttempt(event: MatAutocompleteSelectedEvent): void {
    if (
      this.secondAttemptFlag &&
      this.secondAttemptFlag !== this.planetAutoComplete.value
    ) {
      for (let i = 0; i < this.dataService.selectedPlanetsData.length; i++) {
        this.dataService.selectedPlanetsData[i][this.secondAttemptFlag] = false;
      }
      // Resets the radio group
      this.vehicle.reset();
      // Resets the vehicle speed and time taken that is displayed in the table
      this.vehicleSpeed = 0;
      this.timeTaken = 0;

      // Checks and assigns if launch button should be disabled or not
      this.dataService.findFalconeRequestBody.vehicle_names[
        this.planetInstance
      ] = null;
      console.log(
        'null',
        this.dataService.findFalconeRequestBody.vehicle_names[
          this.planetInstance
        ]
      );
      this.dataService.selectedPlanets.next(
        this.dataService.selectedPlanetsData
      );
      const vehicleArrayLength =
        this.dataService.findFalconeRequestBody.vehicle_names.length === 4;
      this.vehicleNamesExist = this.dataService.findFalconeRequestBody.vehicle_names.every(
        vehicle => {
          return Boolean(vehicle) === true;
        }
      );
      this.dataService.disableLaunchButton = !(
        vehicleArrayLength && this.vehicleNamesExist
      );
    }
    this.secondAttemptFlag = event.option.value;
  }
  // Disable selected planets in other autocomplete
  selectedOptionDisable(event: MatAutocompleteSelectedEvent): void {
    const selectedPlanet = event.option.value;
    for (let i = 0; i < this.dataService.selectedPlanetsData.length; i++) {
      if (this.planetInstance !== i) {
        this.dataService.selectedPlanetsData[i][selectedPlanet] = true;
      }
    }
    this.dataService.selectedPlanets.next(this.dataService.selectedPlanetsData);
  }
  // Returns a boolean if particular option needs to be disabled or not
  disableCheck(option): boolean {
    return this.dataService.selectedPlanetsData[this.planetInstance][option];
  }
  /*------------------------------------ AUTO COMPLETE CODE ENDS-------------------------------*/
}
