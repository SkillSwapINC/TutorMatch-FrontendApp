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
    return this.http.get<any[]>(`${this.resourcePath()}?tutorId=${tutorId}&role=teacher`).pipe(
      map((response: any[]) => response[0])
    );
  }

  getTutoringById(tutoringId: number): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.get(`${this.resourcePath()}/${tutoringId}`);
  }

  /**
   * @method getTutoringsByTutorId
   * @description
   * Obtiene todas las tutorías de un tutor específico por su ID.
   * @param {number} tutorId - ID del tutor.
   * @returns {Observable<any[]>} - Un observable con las tutorías del tutor.
   */
  getTutoringsByTutorId(tutorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}?tutorId=${tutorId}`);
  }

  /**
   * @method updateTutoring
   * @description
   * Actualiza una tutoría existente en la base de datos
   * @param {number} tutoringId - ID de la tutoría a actualizar
   * @param {any} tutoringData - Datos actualizados de la tutoría
   * @returns {Observable<any>} - Observable con la tutoría actualizada
   */
  updateTutoring(tutoringId: number, tutoringData: any): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.patch(`${this.resourcePath()}/${tutoringId}`, tutoringData);
  }

  /**
   * @method deleteTutoring
   * @description
   * Elimina una tutoría existente en la base de datos.
   * @param {number} tutoringId - ID de la tutoría a eliminar.
   * @returns {Observable<any>} - Observable con el resultado de la eliminación.
   */
  deleteTutoring(tutoringId: number): Observable<any> {
    this.resourceEndPoint = '/tutorings';
    return this.http.delete(`${this.resourcePath()}/${tutoringId}`);
  }

}
