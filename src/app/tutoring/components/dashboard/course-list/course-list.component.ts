import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutoringService } from '../../../services/tutoring.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  semesterName: string = '';
  semesterCourses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tutoringService: TutoringService
  ) {}

  ngOnInit(): void {
    const cycle = Number(this.route.snapshot.paramMap.get('cycle'));


    this.tutoringService.getCourses().subscribe((courses: any[]) => {
      console.log('Todos los cursos obtenidos:', courses);


      this.semesterCourses = courses.filter(course => course.cycle === cycle);

      console.log(`Cursos filtrados para el semestre ${cycle}:`, this.semesterCourses);

      this.semesterName = `Semester ${cycle}`;
    }, (error) => {
      console.error('Error al obtener los cursos:', error);
    });
  }
}
