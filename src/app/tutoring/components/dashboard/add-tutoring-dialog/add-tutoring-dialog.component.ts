import {Component, EventEmitter, Output} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TutoringService } from '../../../services/tutoring.service';
import {Tutoring} from "../../../model/tutoring.entity";
import {Course} from "../../../model/course.entity";
import {User} from "../../../model/user.entity";


@Component({
  selector: 'app-add-tutoring-dialog',
  templateUrl: './add-tutoring-dialog.component.html',
  styleUrls: ['./add-tutoring-dialog.component.css']
})
export class AddTutoringDialogComponent {
  @Output() addTutoring = new EventEmitter<Tutoring>();
  semesters = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth'];
  selectedSemester = '';
  availableCourses: { name: string; id: number }[] = [];
  selectedCourse: Course | undefined;
  description = '';
  price: number = 0;
  whatTheyWillLearn = '';
  daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  timeSlots: string[] = ['8-9', '10-11', '12-13', '14-15', '16-17', '18-19', '20-21'];
  currentUser: User | undefined;
  availableTimes: { [day: number]: { [timeSlot: string]: boolean } } = {};
  courseImage: string | undefined;
  imageUploaded: boolean = false;
  errorMessage: string = '';
  isFormValidFlag: boolean = false;

  allSemesters = [
    {
      name: 'First',
      courses: [
        { id: 1, name: 'Introducción a los Algoritmos' }
      ]
    },
    {
      name: 'Second',
      courses: [
        { id: 2, name: 'Algoritmos' }
      ]
    },
    {
      name: 'Third',
      courses: [
        { id: 3, name: 'Algoritmos y Estructuras de Datos' },
        { id: 4, name: 'Diseño y Patrones de Software' }
      ]
    },
    {
      name: 'Fourth',
      courses: [
        { id: 5, name: 'Diseño de Base de Datos' },
        { id: 6, name: 'IHC y Tecnologías Móviles' }
      ]
    },
    {
      name: 'Fifth',
      courses: [
        { id: 7, name: 'Aplicaciones Web' },
        { id: 8, name: 'Desarrollo de Aplicaciones Open Source' }
      ]
    },
    {
      name: 'Sixth',
      courses: [
        { id: 9, name: 'Aplicaciones para Dispositivos Móviles' },
        { id: 10, name: 'Complejidad Algorítmica' }
      ]
    },
    {
      name: 'Seventh',
      courses: [
        { id: 11, name: 'Diseño de Experimentos de Ingeniería de Software' },
        { id: 12, name: 'Fundamentos de Arquitectura de Software' }
      ]
    },
    {
      name: 'Eighth',
      courses: [
        { id: 13, name: 'Arquitecturas de Software Emergentes' },
        { id: 14, name: 'Gerencia de Proyectos en Computación' }
      ]
    }
  ];


  constructor(
    public dialogRef: MatDialogRef<AddTutoringDialogComponent>,
    private tutoringService: TutoringService
  ) {
    this.initializeTimeSlots();
    this.loadCurrentUser();

  }

  /**
   * @method loadCurrentUser
   * @description Load the current user from local storage
   * @returns void
   */

  loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = new User(JSON.parse(userData));
    }
  }

  /**
   * @method initializeTimeSlots
   * @description Initialize the available times for each day of the week
   * @returns void
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
   * @method onSemesterSelected
   * @description Handle the selection of a semester
   * @returns void
   */

  onSemesterSelected(): void {
    const selectedSemesterObj = this.allSemesters.find(sem => sem.name === this.selectedSemester);
    this.availableCourses = selectedSemesterObj ? selectedSemesterObj.courses : [];
    this.checkFormValidity();
  }

  /**
   * @method toggleTimeSlot
   * @description Toggle the availability of a time slot
   * @param day
   * @param timeSlot
   */

  toggleTimeSlot(day: number, timeSlot: string): void {
    this.availableTimes[day][timeSlot] = !this.availableTimes[day][timeSlot];
    this.checkFormValidity();
  }

  /**
   * @method isSelected
   * @description Check if a time slot is selected
   * @param day
   * @param timeSlot
   * @returns boolean
   */

  isSelected(day: number, timeSlot: string): boolean {
    return this.availableTimes[day][timeSlot];
  }

  /**
   * @method isFormValid
   * @description Check if the form is valid
   * @returns boolean
   *
   */

  isFormValid(): boolean {
    return this.selectedSemester !== '' &&
      this.selectedCourse !== undefined &&
      this.description !== '' &&
      this.price > 0 &&
      this.whatTheyWillLearn !== '' &&
      this.courseImage !== undefined &&
      this.areTimeSlotsSelected();
  }

  /**
   * @method areTimeSlotsSelected
   * @description Check if time slots are selected
   * @returns boolean
   */

  areTimeSlotsSelected(): boolean {
    for (let day of this.daysOfWeek) {
      for (let timeSlot of this.timeSlots) {
        if (this.availableTimes[day][timeSlot]) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @method checkFormValidity
   * @description Check the validity of the form
   * @returns void
   */

  checkFormValidity(): void {
    this.isFormValidFlag = this.isFormValid();
  }

  /**
   * @method onConfirmAddTutoring
   * @description Confirm the addition of a tutoring
   * @returns void
   */

  onConfirmAddTutoring(): void {
    if (this.isFormValid() && this.price > 0) {
      const selectedTimes = this.getSelectedTimes();
      const formattedTimes = this.formatTimesForApi(selectedTimes);
      const newTutoring = new Tutoring({
        title: this.selectedCourse?.name || '',
        description: this.description,
        price: this.price,
        times: formattedTimes,
        image: this.courseImage || '',
        whatTheyWillLearn: this.whatTheyWillLearn,
        tutorId: this.currentUser?.id || 0,
        courseId: this.selectedCourse?.id || 0
      });
      this.createTutoring(newTutoring);
    }
  }

  /**
   * @method formatTimesForApi
   * @description Format the times for the API
   * @param selectedTimes
   * @returns { dayOfWeek: number, availableHours: string[] }[]
   */

  formatTimesForApi(selectedTimes: { [day: number]: string[] }): { dayOfWeek: number, availableHours: string[] }[] {
    return this.daysOfWeek.map(day => ({
      dayOfWeek: day,
      availableHours: selectedTimes[day] || []
    }));
  }

  /**
   * @method getSelectedTimes
   * @description Get the selected times
   * @returns { [day: number]: string[] }
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
   * @method closeDialog
   * @description Close the dialog
   * @returns void
   */

  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * @method createTutoring
   * @description Create a tutoring
   * @param tutoring
   * @returns void
   */

  createTutoring(tutoring: Tutoring): void {
    this.tutoringService.createTutoring(tutoring).subscribe({
      next: (response) => {
        const createdTutoring = new Tutoring(response);
        this.addTutoring.emit(createdTutoring);
        this.dialogRef.close(createdTutoring);
      },
      error: (error) => {
        console.error('Error creating tutoring', error);
      }
    });
  }

  /**
   * @method onFileSelected
   * @description Handle the selection of a file
   * @param event
   * @returns void
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
          this.checkFormValidity();
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = 'Invalid file type. Please select a PNG or JPEG file.';
        this.imageUploaded = false;
        this.checkFormValidity();
      }
    }
  }

}

