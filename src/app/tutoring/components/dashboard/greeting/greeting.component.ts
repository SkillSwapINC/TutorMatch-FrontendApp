import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  currentUser: any;
  isTutor: boolean = false;

  constructor(private router: Router) {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isTutor = this.currentUser.roleType === 'teacher';
    }
  }

  /**
   * Navigates to the tutorings view for the current user.
   * @returns void
   */

  openTutorings(): void {
  if (this.currentUser && this.currentUser.tutorId) {
    this.router.navigate([`/tutor/${this.currentUser.tutorId}/tutorings`]).then(r => console.log(r));
  }
}
}
