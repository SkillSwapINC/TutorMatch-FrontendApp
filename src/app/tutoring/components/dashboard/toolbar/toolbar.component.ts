import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTutoringDialogComponent } from '../add-tutoring-dialog/add-tutoring-dialog.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private dialog: MatDialog,private router: Router) {}

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
}
