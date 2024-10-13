import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTutoringDialogComponent } from '../add-tutoring-dialog/add-tutoring-dialog.component';
import {Router} from "@angular/router";
import {RegisterService} from "../../../../public/services/register.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isTutor: boolean = false;

  constructor(private dialog: MatDialog,private router: Router, private registerService: RegisterService) {}

  ngOnInit() {
    const userRole = this.registerService.getUserRole();
    this.isTutor = userRole === 'teacher';
  }

  openAddTutoringDialog(): void {
    const dialogRef = this.dialog.open(AddTutoringDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Result of the dialogue:', result);

      }
    });
  }

  navigateToSettings() {
    this.router.navigate(['/Settings']).then();
  }

  navigateToProfile() {
    this.router.navigate(['/Profile']).then(); // Navegar a ProfileComponent
  }
}
