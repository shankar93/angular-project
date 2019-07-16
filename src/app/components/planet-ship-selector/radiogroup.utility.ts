import { AutocompleteUtility } from './autocomplete.utility';

export class RadiogroupUtility extends AutocompleteUtility {
  /*------------------------------------ RADIO GROUP CODE------------------------------------ */
  vehicleSelected(event) {
    // Emits an event to display next instance of planet-ship-selector
    this.displayNextInstance.emit(this.planetInstance + 1);

    // 0:planetInstance, 1:vehicleType, 2:number
    const value = event.value.split('_');
    // Update vehicle count if radio button selection changed
    this.vehicleSecondCheck();
    this.secondRadioCheck = value[1];
    // Decrement the count of the selected vehicle
    if (this.dataService.vehicleCount[value[1]] > 0) {
      this.dataService.vehicleCount[value[1]] -= 1;
    }
    this.dataService.selectedVehicles.next(this.dataService.vehicleCount);

    this.vehicleSpeed = this.dataService.vehiclesApiData[value[2]].speed;
    this.timeTaken =
      this.dataService.planetDistance[this.planetAutoComplete.value] /
      this.vehicleSpeed;
    this.dataService.vehiclesTimeArray.push(this.timeTaken);
    this.findFalconeRequest();
    console.log(this.dataService.findFalconeRequestBody);
  }

  vehicleSecondCheck() {
    if (this.secondRadioCheck) {
      this.dataService.vehicleCount[this.secondRadioCheck] += 1;
      this.dataService.selectedVehicles.next(this.dataService.vehicleCount);
    }
  }

  // subscribe to selectedvehicles observable to receive updated values
  changeSelectedVehiclesCount() {
    this.dataService.selectedVehicles.subscribe(vehicles => {
      this.allVehicles = vehicles;
    });
  }

  // Returns a boolean if particular option needs to be disabled
  disableVehicleCount(value, num) {
    return (
      value <= 0 ||
      this.dataService.planetDistance[this.planetAutoComplete.value] >
        this.checkDataAvailablity(num)
    );
  }

  checkDataAvailablity(num) {
    try {
      return this.dataService.vehiclesApiData[num].max_distance;
    } catch (e) {}
  }
  /*------------------------------------ RADIO GROUP CODE ENDS-------------------------------- */

  // Push planets, vehicles into the request body to find falcone
  findFalconeRequest() {
    // pushing the planet selected for particular instance to the request body
    this.dataService.findFalconeRequestBody.planet_names[
      this.planetInstance
    ] = this.planetAutoComplete.value;
    // pushing the vehicle selected for particular instance to the request body
    const vehicle_name = 'Space ' + this.secondRadioCheck;
    this.dataService.findFalconeRequestBody.vehicle_names[
      this.planetInstance
    ] = vehicle_name;

    const vehicleArrayLength =
      this.dataService.findFalconeRequestBody.vehicle_names.length === 4;

    this.dataService.disableLaunchButton = !(
      vehicleArrayLength && !this.vehicleNamesExist
    );
  }
}
