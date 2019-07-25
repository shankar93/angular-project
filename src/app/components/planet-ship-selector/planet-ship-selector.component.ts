import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RadiogroupUtility } from './radiogroup.utility';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-planet-ship-selector',
  templateUrl: './planet-ship-selector.component.html',
  styleUrls: ['./planet-ship-selector.component.scss']
})
export class PlanetShipSelectorComponent extends RadiogroupUtility
  implements OnInit, AfterViewChecked {
  constructor(
    public dataService: DataService,
    private cdRef: ChangeDetectorRef
  ) {
    super(dataService);
  }

  ngOnInit() {
    // calls autocompleteInitialzer when planets Api data is received
    this.dataService.planetsList.subscribe(data => {
      this.autoCompleteInitializer();
    });
    /* ----------------------------------Auto complete code------------------------------ */
    // Subscribed to selectedPlanets Behavioural subject
    this.selectedPlanetsSubscribe();
    /* ----------------------------------Auto complete code ends------------------------- */

    /*-----------------------------------Radio group code-------------------------------  */
    // subscribe to selectedvehicles observable to receive updated values
    this.changeSelectedVehiclesCount();
    // Disable vehicle button group by default
    this.vehicle.disable();
    /*-----------------------------------Radio group code ends---------------------------  */
  }

  ngAfterViewChecked() {
    // Invoking the change detection mechanism
    this.cdRef.detectChanges();
  }
  // Returns static text from staticContent.json
  get staticContent() {
    return staticContent;
  }
  get selectorAvailable() {
    return this.dataService.selectorAvailable;
  }
}
