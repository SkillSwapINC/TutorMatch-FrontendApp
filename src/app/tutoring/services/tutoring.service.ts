import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TutoringService extends BaseService<any> {

  constructor() {
    super();

  }

  getCourses(): Observable<any> {
    this.resourceEndPoint = '/courses';
    return this.http.get(this.resourcePath());
  }

  getTutoringByCourseId(courseId: number): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.get(`${this.resourcePath()}?courseId=${courseId}`);
  }

  getCoursesBySemester(cycle: number): Observable<any> {
    this.resourceEndPoint = '/courses';
    return this.http.get(`${this.resourcePath()}?cycle=${cycle}`);
  }

  getUsers(): Observable<any> {
    this.resourceEndPoint = '/users';
    return this.http.get(this.resourcePath());
  }

  getTutorById(tutorId: number): Observable<any> {
    this.resourceEndPoint = '/users';
    return this.http.get(`${this.resourcePath()}?id=${tutorId}&role=teacher`);
  }

  getTutoringById(tutoringId: number): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.get(`${this.resourcePath()}/${tutoringId}`);
  }

}
