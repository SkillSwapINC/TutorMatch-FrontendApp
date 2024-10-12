import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import { Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  /**
   * @property currentUser {any}
   * @description Holds the current user's data.
   */
  currentUser: any;

  private router: Router = inject(Router);

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component's constructor.
   */
  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  /**
   * @method onNavigateHome
   * @description Navigates to the home route.
   */
  protected onNavigateHome() {
    this.router.navigate(['Dashboard']).then();
  }
}
