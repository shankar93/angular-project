import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../../services/data.service';
import staticContent from '../../../assets/jsons/staticContent.json';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  planets = [];
  // Component instance number passed to  planet-ship-selector.component
  planetShipInstance: Array<Number> = [0, 1, 2, 3];
  // Boolean value to display next planet-ship-selector.component
  displayPlanetShipSelector: Array<Boolean> = [true, false, false, false];

  constructor(
    private dataService: DataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    // Adding event listeners for responsivness
    window.addEventListener('orientationchange', this.responsive);
    window.addEventListener('resize', this.responsive);
    window.addEventListener('sizemodechange', this.responsive);
    // Resets the home component on second visit onwards
    this.dataService.homeCountFlag += 1;
    if (this.dataService.homeCountFlag > 1) {
      this.dataService.reset();
    }
    // Fetch the planet details from planets API
    this.planetDataFetcher();
    // Fetch the vehicle details from vehicles API
    this.vehicleDataFetcher();
  }

  ngAfterViewInit() {
    // Makes the page responsive in AfterViewInit lifecycle hook
    this.responsive();
  }

  ngOnDestroy() {
    // Removing event lisetners on component destroy
    window.removeEventListener('orientationchange', this.responsive);
    window.removeEventListener('resize', this.responsive);
    window.removeEventListener('sizemodechange', this.responsive);
  }
  // Fetch planets and distances from planets API
  planetDataFetcher() {
    this.dataService.selectorAvailable = true;
    this.dataService.planetFetch().subscribe(allPlanets => {
      for (const planet of allPlanets) {
        this.planets.push(planet.name);
        this.dataService.planetDistance[planet.name] = planet.distance;
      }
      this.dataService.selectorAvailable = false;
      this.dataService.planetsList.next(1);
    });
  }
  // Returns static text from staticContent.json
  get staticContent() {
    return staticContent;
  }
  // Sets the height for home-container and opac container
  responsive(): void {
    // Height of the header component
    const header = document.getElementById('header').offsetHeight;
    // Height of the footer component
    const footer = document.getElementById('footer').offsetHeight;
    // Gets the height of the body
    const body = document.body.offsetHeight;
    // Sets the height of the home-container
    const home = document.getElementById('home');
    if (home) {
      document.getElementById('home').style.minHeight =
        body - header - footer + 'px';
    }
    // Gets the height of the home-container
    const homeHeight = document.getElementById('home').offsetHeight;
    // Sets the height of the opac-container
    const opac = document.getElementById('opac');
    if (opac) {
      opac.style.minHeight = homeHeight - 48 + 'px';
    }
  }

  // Event recieved from planet-ship-selector.component to dispaly next selector component
  displayNextSelector(selectorInstance: number): void {
    this.displayPlanetShipSelector[selectorInstance] = true;
  }
  // Fetch the vehicle details from vehicles api
  vehicleDataFetcher(): void {
    // Shows the spinner on load of the home component
    this.spinner.show();
    this.dataService.vehicleFetch().subscribe(
      vehicles => {
        this.dataService.vehiclesApiData = vehicles;
        // Creating vehicleCount object with no of vehicles received from the vehicles Api
        for (const vehicle of this.dataService.vehiclesApiData) {
          const name = vehicle.name.split(' ');
          this.dataService.vehicleCount[name[1]] = vehicle.total_no;
        }
        // Hides the spinner after data is received and stored in service
        setTimeout(() => this.spinner.hide(), 800);
      },
      error => {
        if (!sessionStorage.getItem('reloadCount')) {
          sessionStorage.setItem('reloadCount', '0');
        }
        let reloadCount = Number(sessionStorage.getItem('reloadCount'));
        reloadCount++;
        sessionStorage.setItem('reloadCount', String(reloadCount));
        if (reloadCount <= 1) {
          // If there is any server side error the window reloads
          window.location.reload();
        } else if (reloadCount >= 2) {
          const errorMessage = 'No Internet.check your proxy';
          setTimeout(() => {
            this.notifier.show({
              type: 'error',
              message: errorMessage,
              id: 'THAT_NOTIFICATION_ID'
            });
          }, 5000);
        }
      }
    );
  }
  // get disableLaunchButton value from service
  get disableLaunchButton(): Boolean {
    return this.dataService.disableLaunchButton;
  }
  // send selected planets, vehicles to find the falcone after fetching the token
  launchVehicles(): void {
    // Disable launch button
    this.dataService.disableLaunchButton = false;
    // Get token from Api and calls the launchVehiclesApi
    this.dataService.getToken().subscribe(data => {
      console.log(data.token);
      this.dataService.findFalconeRequestBody.token = data.token;
      this.dataService.launchVehiclesApi().subscribe(result => {
        if (result.status === 'success') {
          this.dataService.planetFound = result.planet_name;
          this.dataService.successTimeTaken();
        }
        console.log('timetaken1', this.dataService.timeTaken);
        // redirecting to result page after launch
        this.router.navigate(['/result']);
        // emptying planet,vehicle arrays to try again
        this.dataService.findFalconeRequestBody.planet_names = [];
        this.dataService.findFalconeRequestBody.vehicle_names = [];
        // Hiding the loader on successfully receiving data
        setTimeout(() => this.spinner.hide(), 800);
      });
    });
  }
}
