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
import {Tutoring} from "../../model/tutoring.entity";

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
  @Input() tutoring: Tutoring;
  @Output() editTutoring = new EventEmitter<Tutoring>();
  tutoringForm: FormGroup;
  timeSlots: string[] = ['8-9', '10-11', '12-13', '14-15', '16-17', '18-19', '20-21'];
  daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  availableTimes: { [day: number]: { [timeSlot: string]: boolean } } = {};
  image: string | undefined;
  imageUploaded: boolean = false;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditTutoringDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tutoringService: TutoringService
  ) {
    this.tutoring = data.tutoring;
    this.tutoringForm = this.fb.group({
      price: [this.tutoring.price, [Validators.required, Validators.min(0)]],
      description: [this.tutoring.description, Validators.required],
      whatTheyWillLearn: [this.tutoring.whatTheyWillLearn, Validators.required],
    });
    this.initializeTimeSlots();
  }

  /**
   * @method ngOnInit
   * @description
   * Initializes the available tutoring time slots.
   */

  ngOnInit(): void {
    if (this.tutoring.times) {
      this.tutoring.times.forEach(day => {
        if (!this.availableTimes[day.dayOfWeek]) {
          this.availableTimes[day.dayOfWeek] = {};
        }
        day.availableHours.forEach(slot => {
          this.availableTimes[day.dayOfWeek][slot] = true;
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
          this.image = e.target.result;
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
      const selectedTimes = this.getSelectedTimes();
      const formattedTimes = this.formatTimesForApi(selectedTimes);
      const updatedTutoring = {
        ...this.tutoring,
        price: this.tutoringForm.value.price,
        description: this.tutoringForm.value.description,
        whatTheyWillLearn: this.tutoringForm.value.whatTheyWillLearn,
        times: formattedTimes,
        image: this.image || this.tutoring.image
      };
      this.updateTutoring(updatedTutoring);
    }
  }

  /**
   * @method formatTimesForApi
   * @description
   * Formats the selected tutoring times for the API.
   * @param {Object} selectedTimes - Selected tutoring times.
   * @returns {Object[]} - Formatted tutoring times.
   */

  formatTimesForApi(selectedTimes: { [day: number]: string[] }): { dayOfWeek: number, availableHours: string[] }[] {
    return this.daysOfWeek.map(day => ({
      dayOfWeek: day,
      availableHours: selectedTimes[day] || []
    }));
  }

  /**
   * @method updateTutoring
   * @description
   * Update the tutoring session.
   * @param {Tutoring} tutoring - Tutoring session.
   * @returns {void}
   */

  updateTutoring(tutoring: Tutoring): void {
    this.tutoringService.updateTutoring(tutoring.id, tutoring).subscribe({
      next: (response) => {
        const updatedTutoring = new Tutoring(response);
        this.editTutoring.emit(updatedTutoring);
        this.dialogRef.close(updatedTutoring);
      },
      error: (error) => {
        console.error('Error updating tutoring', error);
      }
    });
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
