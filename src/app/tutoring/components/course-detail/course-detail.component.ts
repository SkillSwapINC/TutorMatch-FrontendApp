import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Importa Router para navegación
import { TutoringService } from '../../services/tutoring.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;
  times: any = {};
  tutorName: string | undefined;
  tutorAvatar: string | undefined;
  courseImage: string | undefined;
  coursePrice: number | undefined;
  semesterName: string | undefined;
  courseNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tutoringService: TutoringService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    console.log('Course ID from URL:', courseId);

    if (courseId !== 0) {
      this.getCourseDetails(courseId);
    }
  }

  getCourseDetails(courseId: number) {
    this.tutoringService.getTutoringByCourseId(courseId).subscribe(
      (tutorings: any[]) => {
        const selectedCourse = tutorings.find((tutoring: any) => tutoring.courseId === courseId);

        if (selectedCourse) {
          this.course = selectedCourse;
          this.courseImage = selectedCourse.image;
          this.coursePrice = selectedCourse.price;
          this.times = selectedCourse.times || {};

          this.getTutorDetails(selectedCourse.tutorId);
          this.getSemesterName(selectedCourse.courseId);
          this.courseNotFound = false;
        } else {

          this.courseNotFound = true;
        }
      },

    );
  }


  getTutorDetails(tutorId: number) {
    this.tutoringService.getUsers().subscribe(
      (users: any[]) => {

        const tutor = users.find((user: any) => user.tutorId == tutorId && user.role === 'teacher');

        if (tutor) {
          this.tutorName = `${tutor.name} ${tutor.lastName}`;
          this.tutorAvatar = tutor.avatar;
        } else {

          this.tutorName = 'No disponible';
          this.tutorAvatar = undefined;
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos del tutor:', error);
      }
    );
  }



  getSemesterName(courseId: number) {

    this.tutoringService.getCourses().subscribe(
      (courses: any[]) => {
        const selectedCourse = courses.find(course => course.id === courseId);
        if (selectedCourse) {

          this.semesterName = `Semester ${selectedCourse.cycle}`;
        } else {
          this.semesterName = 'Semestre no encontrado';
        }
      },
    );
  }


  navigateToSemester() {
    if (this.semesterName) {
      const cycle = Number(this.semesterName.split(' ')[1]);
      this.router.navigate(['/courses', cycle]);
    }
  }
}
