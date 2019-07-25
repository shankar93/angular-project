import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  // Returns static text from staticContent.json
  get staticContent() {
    return staticContent;
  }
  // Resets to initial state
  reset(): void {
    this.dataService.reset();
    this.dataService.duplicateNavigation();
  }
}
