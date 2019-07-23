import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {}

  get staticContent() {
    return staticContent;
  }

  reset() {
    this.dataService.duplicateNavigation();
    this.dataService.reset();
  }
}
