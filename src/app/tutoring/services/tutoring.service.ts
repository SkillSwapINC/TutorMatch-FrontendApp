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

  /**
   * @method getCourses
   * @description
   * Retrieves all courses.
   * @returns {Observable<any>} - An observable with the list of courses.
   */

  getCourses(): Observable<any> {
    this.resourceEndPoint = '/courses';
    return this.http.get(this.resourcePath());
  }

  /**
   * @method getTutoringByCourseId
   * @description
   * Retrieves tutoring sessions by course ID.
   * @param {number} courseId - The ID of the course.
   * @returns {Observable<any>} - An observable with the tutoring sessions.
   */

  getTutoringByCourseId(courseId: number): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.get(`${this.resourcePath()}?courseId=${courseId}`);
  }

  /**
   * @method getCoursesBySemester
   * @description
   * Retrieves courses by semester cycle.
   * @param {number} cycle - The semester cycle.
   * @returns {Observable<any>} - An observable with the courses.
   */

  getCoursesBySemester(cycle: number): Observable<any> {
    this.resourceEndPoint = '/courses';
    return this.http.get(`${this.resourcePath()}?cycle=${cycle}`);
  }

  /**
   * @method getUsers
   * @description
   * Retrieves all users.
   * @returns {Observable<any>} - An observable with the list of users.
   */

  getUsers(): Observable<any> {
    this.resourceEndPoint = '/users';
    return this.http.get(this.resourcePath());
  }

  /**
   * @method getTutorById
   * @description
   * Retrieves a tutor by their ID.
   * @param {number} tutorId - The ID of the tutor.
   * @returns {Observable<any>} - An observable with the tutor's information.
   */

  getTutorById(tutorId: number): Observable<any> {
    this.resourceEndPoint = '/users';
    return this.http.get<any[]>(`${this.resourcePath()}?tutorId=${tutorId}&role=teacher`).pipe(
      map((response: any[]) => response[0])
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
    this.resourceEndPoint = '/tutorings';
    return this.http.get(`${this.resourcePath()}/${tutoringId}`);
  }

  /**
   * @method getTutoringsByTutorId
   * @description
   * Retrieves all tutoring sessions of a specific tutor by their ID.
   * @param {number} tutorId - The ID of the tutor.
   * @returns {Observable<any[]>} - An observable with the tutor's tutoring sessions.
   */

  getTutoringsByTutorId(tutorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}?tutorId=${tutorId}`);
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
    this.resourceEndPoint = '/tutorings';
    return this.http.patch(`${this.resourcePath()}/${tutoringId}`, tutoringData);
  }

  /**
   * @method deleteTutoring
   * @description
   * Deletes an existing tutoring session from the database.
   * @param {number} tutoringId - The ID of the tutoring session to delete.
   * @returns {Observable<any>} - An observable with the result of the deletion.
   */

  deleteTutoring(tutoringId: number): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.delete(`${this.resourcePath()}/${tutoringId}`);
  }

}
