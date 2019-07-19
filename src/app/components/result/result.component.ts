import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Vehicles } from '../../models/vehicles.model';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    window.addEventListener('orientationchange', this.responsive);
    window.addEventListener('resize', this.responsive);
    window.addEventListener('sizemodechange', this.responsive);
  }

  ngAfterViewInit() {
    this.responsive();
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', this.responsive);
    window.removeEventListener('resize', this.responsive);
    window.removeEventListener('sizemodechange', this.responsive);
  }

  responsive() {
    const header = document.getElementById('header').offsetHeight;
    const footer = document.getElementById('footer').offsetHeight;
    const body = document.body.offsetHeight;
    const result = document.getElementById('result');
    if (result) {
      result.style.minHeight = body - header - footer + 'px';
    }

    const resultHeight = document.getElementById('result').offsetHeight;
    const opac = document.getElementById('opac');
    if (opac) {
      opac.style.minHeight = resultHeight - 48 + 'px';
    }

    console.log(
      'body' +
        body +
        'header' +
        header +
        'footer' +
        footer +
        'result' +
        resultHeight
    );
  }
  get staticContent() {
    return staticContent;
  }
  get planetFound(): String {
    return this.dataService.planetFound;
  }

  get timeTaken() {
    return this.dataService.timeTaken;
  }

  reset() {
    this.dataService.duplicateNavigation();
    this.dataService.reset();
  }
}
