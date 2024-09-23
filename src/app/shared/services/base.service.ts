import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {inject} from "@angular/core";

/**
 * Base service class for CRUD operations
 * @description
 * This class provides the basic CRUD operations for a resource.
 * @remarks
 * It is intended to be extended by other services.
 */
export class BaseService<T> {
  /**
   * @property httpOptions
   * @description
   * HTTP headers for the requests. The content type is set to JSON.
   */
  protected httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  /**
   * @property http
   * @description
   * HTTP client for making requests to the server.
   */
  protected http: HttpClient = inject(HttpClient);

  /**
   * @property basePath
   * @description
   * Base path for the server. This is the URL of the server.
   */
  protected basePath: string = `${environment.serverBasePath}`;

  /**
   * @property resourceEndPoint
   * @description
   * The endpoint for the resource. This is the URL path for the resource.
   */
  protected resourceEndPoint: string = '/resources';

  /**
   * @method handleError
   * @description
   * Handles the error response from the server. It logs the error to the console and returns an observable with the error.
   * @param {HttpErrorResponse} error  - The error response from the server.
   */
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /**
   * @method resourcePath
   * @description
   * Build and returns the full path for the resource.
   * @returns {string} The full path for the resource.
   */
  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndPoint}`;
  }

  /**
   * @method create
   * @description
   * Creates a new resource on the server.
   * @param   {any} item - The item to be created.
   * @returns {Observable<T>} - An observable with the created item.
   */
  public create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @method delete
   * @description
   * Deletes a resource from the server.
   * @param   {any} id - The id of the resource to be deleted.
   * @returns {Observable<any>} - An observable with the response from the server.
   */
  public delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * update
   * @description
   * Updates a resource on the server.
   * @param {any} id - The id of the resource to be updated.
   * @param {any} item - The item to be updated.
   * @returns {Observable<T>} - An observable with the updated item.
   */
  public update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @method getAll
   * @description
   * Gets all the resources from the server.
   * @returns {Observable<Array<T>>} - An observable with the array of resources.
   */
  public getAll(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
