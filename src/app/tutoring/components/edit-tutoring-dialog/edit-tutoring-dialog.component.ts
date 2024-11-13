import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { TutoringService } from '../../services/tutoring.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-tutoring-dialog',
  templateUrl: 'edit-tutoring-dialog.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    MatButton,
    MatOption,
    MatSelect,
    MatFormField,
    MatDialogContent,
    MatIcon,
    MatIconButton,
    MatDialogTitle,
    MatInput,
    NgClass,
    MatDialogActions,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['edit-tutoring-dialog.component.css']
})
export class EditTutoringDialogComponent implements OnInit {
  tutoring: any;
  tutoringForm: FormGroup;
  daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  timeSlots = ['10-11', '11-12', '15-16', '17-18', '20-21'];
  courseImage: string | undefined;
  imageUploaded: boolean = false;
  errorMessage: string = '';
  availableTimes: { [day: number]: { [timeSlot: string]: boolean } } = {};

  constructor(
    public dialogRef: MatDialogRef<EditTutoringDialogComponent>,
    private tutoringService: TutoringService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tutoring = data.tutoring;
    this.tutoringForm = this.fb.group({
      title: [this.tutoring.title, Validators.required],
      description: [this.tutoring.description, Validators.required],
      price: [this.tutoring.price, [Validators.required, Validators.min(0)]],
      whatTheyWillLearn: [this.tutoring.whatTheyWillLearn, Validators.required],
    });
    this.initializeTimeSlots();
    this.courseImage = this.tutoring.image;
    this.imageUploaded = !!this.courseImage;
  }

  /**
   * @method ngOnInit
   * @description
   * Initializes the available tutoring time slots.
   */

  ngOnInit(): void {
    if (this.tutoring.times) {
      Object.entries(this.tutoring.times).forEach(([day, slots]: [string, any]) => {
        slots.forEach((slot: string) => {
          this.availableTimes[Number(day)][slot] = true;
        });
      });
    }
  }

  /**
   * @method initializeTimeSlots
   * @description
   * Initializes the available tutoring time slots.
   * @returns {void}
   */

  initializeTimeSlots(): void {
    for (let day of this.daysOfWeek) {
      this.availableTimes[day] = {};
      for (let timeSlot of this.timeSlots) {
        this.availableTimes[day][timeSlot] = false;
      }
    }
  }

  /**
   * @method toggleTimeSlot
   * @description
   * Toggles the state of a tutoring time slot.
   * @param {number} day - Day of the week.
   * @param {string} timeSlot - Tutoring time slot.
   * @returns {void}
   */

  toggleTimeSlot(day: number, timeSlot: string): void {
    this.availableTimes[day][timeSlot] = !this.availableTimes[day][timeSlot];
  }

   /**
  * @method isSelected
  * @description
  * Checks if a tutoring time slot is selected.
  * @param {number} day - Day of the week.
  * @param {string} timeSlot - Tutoring time slot.
  * @returns {boolean} - True if the time slot is selected.
  */

  isSelected(day: number, timeSlot: string): boolean {
    return this.availableTimes[day][timeSlot];
  }

  /**
   * @method onFileSelected
   * @description
   * Obtains the selected file and displays it as an image.
   * @param {any} event - File change event.
   * @returns {void}
   */

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.courseImage = e.target.result;
          this.imageUploaded = true;
          this.errorMessage = '';
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = 'Invalid file type. Please select a PNG or JPEG file.';
        this.imageUploaded = false;
      }
    }
  }

  /**
   * @method getSelectedTimes
   * @description
   * Obtains the selected tutoring times.
   * @returns {Object} - Selected tutoring times.
   */

  getSelectedTimes(): { [day: number]: string[] } {
    let selectedTimes: { [day: number]: string[] } = {};
    for (let day of this.daysOfWeek) {
      selectedTimes[day] = [];
      for (let timeSlot of this.timeSlots) {
        if (this.availableTimes[day][timeSlot]) {
          selectedTimes[day].push(timeSlot);
        }
      }
    }
    return selectedTimes;
  }

  /**
   * @method onConfirmEditTutoring
   * @description
   * Update the tutoring session.
   * @returns {void}
   */

  onConfirmEditTutoring(): void {
    if (this.tutoringForm.valid) {
      const updatedTutoring = {
        ...this.tutoring,
        ...this.tutoringForm.value,
        image: this.courseImage,
        times: this.getSelectedTimes()
      };

      this.tutoringService.updateTutoring(this.tutoring.id, updatedTutoring).subscribe({
        next: response => {
          this.dialogRef.close(response);
        },
        error: () => {
          this.errorMessage = 'Error updating tutoring session. Please try again.';
        }
      });
    }
  }

  /**
   * @method closeDialog
   * @description
   * Close the dialog.
   * @returns {void}
   */

  closeDialog(): void {
    this.dialogRef.close();
  }
}
