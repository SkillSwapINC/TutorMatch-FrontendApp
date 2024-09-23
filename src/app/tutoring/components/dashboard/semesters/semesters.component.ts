import { Component } from '@angular/core';

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrl: './semesters.component.css'
})
export class SemestersComponent {
  semesters = [
    { name: 'Algorithm', label: 'First Semester', image: 'Algorithm.png' }, // Update with your image paths
    { name: 'OOP', label: 'Second Semester', image: 'OOP.png' },
    { name: 'Data Structure', label: 'Third Semester', image: 'DataStructure.png' },
    { name: 'Database', label: 'Fourth Semester', image: 'Database.png' },
    { name: 'Web App', label: 'Fifth Semester', image: 'WebApp.png' },
    { name: 'Mobile App', label: 'Sixth Semester', image: 'MobileApp.png' },
    { name: 'Networking', label: 'Seventh Semester', image: 'Networking.png' },
    { name: 'Final Project', label: 'Eighth Semester', image: 'FinalProject.png' },
  ];
}