import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTutoringDialogComponent } from '../add-tutoring-dialog/add-tutoring-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private dialog: MatDialog) {}

  openAddTutoringDialog(): void {
    const dialogRef = this.dialog.open(AddTutoringDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Result of the dialogue:', result);

      }
    });
  }
}
