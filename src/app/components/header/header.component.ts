import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {}

  reset() {
    this.dataService.duplicateNavigation();
    this.dataService.reset();
  }
}
