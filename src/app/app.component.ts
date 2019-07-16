import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FEproblem1';
  constructor(private router: Router) {}

  ngOnInit() {
    // navigates to home component on browser refresh
    // this.router.navigate(['/home']);
  }
}
