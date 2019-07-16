import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vehicles } from '../../models/vehicles.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {}

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
