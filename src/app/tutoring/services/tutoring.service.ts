import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TutoringService extends BaseService<any> {

  constructor() {
    super();
    this.resourceEndPoint = '/tutorings';
  }

  private buildPath(endpoint: string): string {
    return `${this.basePath}${endpoint}`;
  }

  /**
   * @method getCourses
   * @description
   * Retrieves all courses.
   * @returns {Observable<any>} - An observable with the list of courses.
   */

  getCourses(): Observable<any> {
    return this.http.get(this.buildPath('/courses'));
  }

  /**
   * @method getTutoringByCourseId
   * @description
   * Retrieves tutoring sessions by course ID.
   * @param {number} courseId - The ID of the course.
   * @returns {Observable<any>} - An observable with the tutoring sessions.
   */

  getTutoringByCourseId(courseId: number): Observable<any> {
    return this.http.get(this.buildPath(`/tutorings?courseId=${courseId}`));
  }

  /**
   * @method getCoursesBySemester
   * @description
   * Retrieves courses by semester cycle.
   * @param {number} cycle - The semester cycle.
   * @returns {Observable<any>} - An observable with the courses.
   */

  getCoursesBySemester(cycle: number): Observable<any> {
    return this.http.get(this.buildPath(`/courses?cycle=${cycle}`));
  }

  /**
   * @method getUsers
   * @description
   * Retrieves all users.
   * @returns {Observable<any>} - An observable with the list of users.
   */

  getUsers(): Observable<any> {
    return this.http.get(this.buildPath('/users'));
  }

  /**
   * @method getTutorById
   * @description
   * Retrieves a tutor by their ID.
   * @param {number} tutorId - The ID of the tutor.
   * @returns {Observable<any>} - An observable with the tutor's information.
   */

  getTutorById(tutorId: number): Observable<any> {
  return this.http.get<any[]>(this.buildPath(`/users`)).pipe(
    map((response: any[]) => response.find(user => user.tutorId === tutorId && user.roleType === 'teacher'))
  );
}

  /**
   * @method getTutoringById
   * @description
   * Retrieves a tutoring session by its ID.
   * @param {number} tutoringId - The ID of the tutoring session.
   * @returns {Observable<any>} - An observable with the tutoring session.
   */

  getTutoringById(tutoringId: number): Observable<any> {
    return this.http.get(this.buildPath(`/tutorings/${tutoringId}`));
  }

  /**
   * @method getTutoringsByTutorId
   * @description
   * Retrieves all tutoring sessions of a specific tutor by their ID.
   * @param {number} tutorId - The ID of the tutor.
   * @returns {Observable<any[]>} - An observable with the tutor's tutoring sessions.
   */

  getTutoringsByTutorId(tutorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.buildPath(`/tutorings?tutorId=${tutorId}`));
  }

  /**
   * @method updateTutoring
   * @description
   * Updates an existing tutoring session in the database.
   * @param {number} tutoringId - The ID of the tutoring session to update.
   * @param {any} tutoringData - The updated data of the tutoring session.
   * @returns {Observable<any>} - An observable with the updated tutoring session.
   */

  updateTutoring(tutoringId: number, tutoringData: any): Observable<any> {
    return this.http.patch(this.buildPath(`/tutorings/${tutoringId}`), tutoringData);
  }

  /**
   * @method deleteTutoring
   * @description
   * Deletes an existing tutoring session from the database.
   * @param {number} tutoringId - The ID of the tutoring session to delete.
   * @returns {Observable<any>} - An observable with the result of the deletion.
   */

  deleteTutoring(tutoringId: number): Observable<any> {
    return this.http.delete(this.buildPath(`/tutorings/${tutoringId}`));
  }

}
