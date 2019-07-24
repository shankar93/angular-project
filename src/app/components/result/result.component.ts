import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { VehiclesModel } from '../../models/vehicles.model';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    // Adding event listeners for responsivness
    window.addEventListener('orientationchange', this.responsive);
    window.addEventListener('resize', this.responsive);
    window.addEventListener('sizemodechange', this.responsive);
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

  responsive(): void {
    // Height of the header component
    const header = document.getElementById('header').offsetHeight;
    // Height of the footer component
    const footer = document.getElementById('footer').offsetHeight;
    // Gets the height of the body
    const body = document.body.offsetHeight;
    // Sets the height of the result-container
    const result = document.getElementById('result');
    if (result) {
      result.style.minHeight = body - header - footer + 'px';
    }
    // Gets the height of the result-container
    const resultHeight = document.getElementById('result').offsetHeight;
    // Sets the height of the opac-container
    const opac = document.getElementById('opac');
    if (opac) {
      opac.style.minHeight = resultHeight - 48 + 'px';
    }

    // console.log(
    //   'body' +
    //     body +
    //     'header' +
    //     header +
    //     'footer' +
    //     footer +
    //     'result' +
    //     resultHeight
    // );
  }
  // Returns static text from staticContent.json
  get staticContent(): object {
    return staticContent;
  }
  // Gets and returns planetFound from dataService
  get planetFound(): String {
    return this.dataService.planetFound;
  }
  // Gets and returns timeTaken from dataService
  get timeTaken(): number {
    return this.dataService.timeTaken;
  }
  // Resets to initial state
  reset(): void {
    this.dataService.duplicateNavigation();
    this.dataService.reset();
  }
}
