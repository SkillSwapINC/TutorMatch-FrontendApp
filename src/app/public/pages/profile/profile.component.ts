import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import { Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

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
    MatButton,
    TranslateModule
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
   * @method goBack
   * @param event
   * @description Navigates back to the previous page.
   */
  goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
