import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.css']
})
export class SemestersComponent {
  semesters = [
    { name: 'Algorithm', labelKey: 'footer.first', image: 'Algorithm.png' },
    { name: 'OOP', labelKey: 'footer.second', image: 'OOP.png' },
    { name: 'Data Structure', labelKey: 'footer.third', image: 'DataStructure.png' },
    { name: 'Database', labelKey: 'footer.fourth', image: 'Database.png' },
    { name: 'Web App', labelKey: 'footer.fifth', image: 'WebApp.png' },
    { name: 'Mobile App', labelKey: 'footer.sixth', image: 'MobileApp.png' },
    { name: 'Networking', labelKey: 'footer.seventh', image: 'Networking.png' },
    { name: 'Final Project', labelKey: 'footer.eighth', image: 'FinalProject.png' },
  ];

  constructor(public translate: TranslateService) {}
}
