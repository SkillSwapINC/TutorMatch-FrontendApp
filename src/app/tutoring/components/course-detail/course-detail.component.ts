import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutoringService } from '../../services/tutoring.service';
import { Tutoring } from '../../model/tutoring.entity';
import {User} from "../../model/user.entity";
import { TranslateModule } from "@ngx-translate/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FooterContentComponent } from "../../../public/components/footer-content/footer-content.component";
import { DashboardModule } from "../dashboard/dashboard.module";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf,
    NgClass,
    FooterContentComponent,
    DashboardModule,
    NgIf
  ],
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  tutoring: Tutoring | undefined;
  tutor: User | undefined;
  semesterName: string | undefined;
  courseNotFound: boolean = false;
  timeSlots: string[] = ['8-9', '10-11', '12-13', '14-15', '16-17', '18-19', '20-21'];

  constructor(
    private route: ActivatedRoute,
    private tutoringService: TutoringService
  ) {}

  ngOnInit(): void {
    const tutoringId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    console.log('Received tutoringId:', tutoringId);
    if (tutoringId !== 0) {
      this.getCourseDetails(tutoringId);
    } else {
      console.error('Tutoring ID is invalid or not provided.');
    }
  }

  /**
   * @method getCourseDetails
   * @description
   * Fetches the course details by tutoring ID.
   *
   * @param tutoringId
   */
  getCourseDetails(tutoringId: number) {
    this.tutoringService.getTutoringById(tutoringId).subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.tutoring = new Tutoring(data[0]);
          console.log('Tutoring object after construction:', this.tutoring);
          console.log('Tutor ID:', this.tutoring.tutorId);

          const tutorId = this.tutoring.tutorId;
          if (tutorId && tutorId > 0) {
            this.getTutorDetails(tutorId);
            this.getSemesterName(this.tutoring.courseId);
          } else {
            this.tutor = undefined;
          }

          this.courseNotFound = false;
        } else {
          this.courseNotFound = true;
        }
      },
      error: (error) => {
        console.error('Error fetching course details', error);
        this.courseNotFound = true;
      }
    });
  }

  /**
   * @method getTutorDetails
   * @description
   * Fetches the tutor details by tutor ID.
   *
   * @param tutorId
   */

  getTutorDetails(tutorId: number) {
    console.log('Fetching tutor details for tutorId:', tutorId);
    this.tutoringService.getTutorById(tutorId).subscribe({
      next: (tutorData: any) => {
        if (tutorData) {
          this.tutor = new User(tutorData);
          console.log('Tutor object after construction:', this.tutor);
        } else {
          this.tutor = undefined;
        }
      },
      error: (error) => {
        console.error('Error fetching tutor details', error);
        this.tutor = undefined;
      }
    });
  }

  /**
   * @method getSemesterName
   * @description
   * Fetches the semester name by course ID.
   *
   * @param courseId
   */

  getSemesterName(courseId: number) {
    if (!courseId || courseId <= 0) {
      this.semesterName = 'Semester not available';
      return;
    }

    this.tutoringService.getCourses().subscribe({
      next: (courses: any[]) => {
        const selectedCourse = courses.find(course => course.id === courseId);
        this.semesterName = selectedCourse ? `Semester ${selectedCourse.cycle}` : 'Semester not available';
      },
      error: () => {
        this.semesterName = 'Semester not available';
      }
    });
  }

  /**
   * @method goBack
   * @description
   * Navigates to the previous page.
   *
   * @param event
   */

  goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  /**
   * @method isTimeSlotValidated
   * @description
   * Checks if the time slot is validated.
   *
   * @param day
   * @param timeSlot
   * @returns {boolean | undefined}
   */

  isTimeSlotValidated(day: number, timeSlot: string): boolean | undefined {
    return this.tutoring?.times[day]?.availableHours.includes(timeSlot);
  }

  protected readonly encodeURIComponent = encodeURIComponent;
}
