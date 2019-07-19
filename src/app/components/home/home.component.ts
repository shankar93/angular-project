import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from '../../services/data.service';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Instance number passed to  planet-ship-selector.component
  planetShipInstance: Array<Number> = [0, 1, 2, 3];
  // Boolean value to display next planet-ship-selector.component
  displayPlanetShipSelector: Array<Boolean> = [true, false, false, false];
  // vehicles api data
  vehiclesApiData: any;

  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    window.addEventListener('orientationchange', this.responsive);
    window.addEventListener('resize', this.responsive);
    window.addEventListener('sizemodechange', this.responsive);

    console.log('count', this.dataService.homeCountFlag);
    this.dataService.homeCountFlag += 1;
    if (this.dataService.homeCountFlag > 1) {
      this.dataService.reset();
    }

    this.vehicleDataFetcher();
  }

  ngAfterViewInit() {
    this.responsive();
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', this.responsive);
    window.removeEventListener('resize', this.responsive);
    window.removeEventListener('sizemodechange', this.responsive);
  }
  get staticContent() {
    return staticContent;
  }
  responsive() {
    const header = document.getElementById('header').offsetHeight;
    const footer = document.getElementById('footer').offsetHeight;
    const body = document.body.offsetHeight;
    const home = document.getElementById('home');
    if (home) {
      document.getElementById('home').style.minHeight =
        body - header - footer + 'px';
    }

    const homeHeight = document.getElementById('home').offsetHeight;
    const opac = document.getElementById('opac');
    if (opac) {
      opac.style.minHeight = homeHeight - 48 + 'px';
    }
  }

  // Event recieved from planet-ship-selector.component to dispaly next selector component
  displayNextSelector(selectorInstance) {
    this.displayPlanetShipSelector[selectorInstance] = true;
  }
  // Fetch the vehicle details from vehicles api
  vehicleDataFetcher() {
    this.spinner.show();
    this.dataService.vehicleFetch().subscribe(vehicles => {
      this.dataService.vehiclesApiData = vehicles;
      for (const vehicle of this.dataService.vehiclesApiData) {
        const name = vehicle.name.split(' ');
        this.dataService.vehicleCount[name[1]] = vehicle.total_no;
      }
      setTimeout(() => this.spinner.hide(), 1000);
      console.log(this.dataService.vehicleCount);
    });
  }
  // get disableLaunchButton value from service
  get disableLaunchButton(): Boolean {
    return this.dataService.disableLaunchButton;
  }
  // send selected planets, vehicles to find the falcone after fetching the token
  launchVehicles() {
    // Disable launch button
    this.dataService.disableLaunchButton = false;
    // Get token from Api
    this.dataService.getToken();
  }
}
