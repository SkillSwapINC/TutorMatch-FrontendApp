import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutoringService } from '../../../services/tutoring.service';
import { TranslateService } from '@ngx-translate/core';
import { Course } from '../../../model/course.entity';
import { Tutoring } from '../../../model/tutoring.entity';
import { User } from '../../../model/user.entity';

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
    private tutoringService: TutoringService,
    private translate: TranslateService
  ) {}

  /**
   * @method ngOnInit
   * @description
   * This method is called when the component is initialized.
   */

  ngOnInit(): void {
    const cycle = Number(this.route.snapshot.paramMap.get('cycle'));

    this.tutoringService.getCoursesBySemester(cycle).subscribe((courses: Course[]) => {
      if (courses.length === 0) {
        this.semesterCourses = [];
      } else {
        courses.forEach(course => {
          this.tutoringService.getTutoringByCourseId(course.id).subscribe((tutorings: Tutoring[]) => {
            tutorings.forEach(tutoring => {
              this.tutoringService.getTutorById(tutoring.tutorId).subscribe((tutor: User) => {
                if (tutor) {
                  const newTutoring = {
                    id: tutoring.id,
                    courseName: course.name,
                    tutorName: `${tutor.fullName}`,
                    price: tutoring.price,
                    image: tutoring.image,
                    title: tutoring.title
                  };
                  this.semesterCourses.push(newTutoring);
                }
              });
            });
          });
        });
      }
      this.updateSemesterName(cycle);
    });

    this.translate.onLangChange.subscribe(() => {
      const cycle = Number(this.route.snapshot.paramMap.get('cycle'));
      this.updateSemesterName(cycle);
    });
  }

  /**
   * @method updateSemesterName
   * @description
   * This method updates the semester name.
   * @param cycle
   */

  updateSemesterName(cycle: number): void {
    this.translate.get('footer.semester').subscribe((res: string) => {
      this.semesterName = `${res} ${cycle}`;
    });
  }
}
