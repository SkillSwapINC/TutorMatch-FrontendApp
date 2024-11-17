import { Component, OnInit } from '@angular/core';
import { TutoringService } from '../../services/tutoring.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { EditTutoringDialogComponent } from '../edit-tutoring-dialog/edit-tutoring-dialog.component';
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DashboardModule} from "../dashboard/dashboard.module";
import {FooterContentComponent} from "../../../public/components/footer-content/footer-content.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-tutor-tutorings',
  templateUrl: './tutor-tutorings.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf,
    MatIconButton,
    MatIcon,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatCardHeader,
    MatCard,
    DashboardModule,
    MatButton,
    FooterContentComponent,
    TranslateModule
  ],
  styleUrls: ['./tutor-tutorings.component.css']
})
export class TutorTutoringsComponent implements OnInit {
  tutorings: any[] = [];
  tutorId: number;

  constructor(
    private tutoringService: TutoringService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.tutorId = +this.route.snapshot.paramMap.get('tutorId')!;
  }

  ngOnInit(): void {
    this.loadTutorings();
  }

  /**
   * @method loadTutorings
   * @description
   * Load the tutorings of the tutor.
   * @returns {void}
   */

  loadTutorings(): void {
    this.tutoringService.getTutoringsByTutorId(this.tutorId).subscribe(
      (tutorings: any[]) => {
        this.tutorings = tutorings.map(tutoring => ({
          id: tutoring.id,
          title: tutoring.title,
          description: tutoring.description,
          price: tutoring.price,
          times: tutoring.times,
          image: tutoring.image,
          whatTheyWillLearn: tutoring.whatTheyWillLearn
        }));
      }
    );
  }

  /**
   * @method editTutoring
   * @description
   * Open a dialog to edit a tutoring session.
   * @param {number} tutoringId - ID of the tutoring session to edit.
   * @returns {void}
   */

  editTutoring(tutoringId: number): void {
    const tutoring = this.tutorings.find(t => t.id === tutoringId);

    if (tutoring) {
      const dialogRef = this.dialog.open(EditTutoringDialogComponent, {
        data: { tutoring }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadTutorings();
        }
      });
    }
  }

  /**
   * @method deleteTutoring
   * @description
   * Delete a tutoring session by its ID and reload the tutorings.
   * @param {number} tutoringId - ID of the tutoring session to delete.
   * @returns {void}
   */
  deleteTutoring(tutoringId: number): void {
    this.tutoringService.deleteTutoring(tutoringId).subscribe({
      next: () => {
        this.loadTutorings();
      },
      error: () => {
        console.error('Error deleting tutoring session. Please try again.');
      }
    });
  }
   /**
  * @method truncateDescription
  * @description
  * Truncates the description to a specific number of words.
  * @param {string} description - The full description.
  * @param {number} limit - The maximum number of words.
  * @returns {string} - The truncated description.
  */
  truncateDescription(description: string, limit: number): string {
  const words = description.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
    return description;
  }

  /**
   * @method confirmDeleteTutoring
   * @description
   * Open a dialog to confirm the deletion of a tutoring session.
   * @param {number} tutoringId - ID de la tutoría a eliminar.
   * @returns {void}
   */
  confirmDeleteTutoring(tutoringId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTutoring(tutoringId);
      }
    });
  }

  /**
   * @method goToCourseDetail
   * @description Navigate to the course detail page.
   * @param {number} tutoringId - ID de la tutoría.
   * @returns {void}
   */
  goToCourseDetail(tutoringId: number): void {
    this.router.navigate(['/tutorings', tutoringId]).then(r => r);
  }
}
