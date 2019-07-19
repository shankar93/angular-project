import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import staticContent from '../../../assets/jsons/staticContent.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  get staticContent() {
    return staticContent;
  }
}
