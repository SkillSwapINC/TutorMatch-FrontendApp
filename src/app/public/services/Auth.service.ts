import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})

/**
 * @class AuthService
 * @description This service handles authentication and user management.
 * @extends BaseService<any>
 */
export class AuthService extends BaseService<any>{

  /**
   * @property currentUserKey {string}
   * @description The key used to store the current user in local storage.
   */
  private currentUserKey = 'currentUser';

  constructor( private router: Router) {
    super();
    this.resourceEndPoint='/users'
  }

  /**
   * @method login
   * @description Attempts to log in a user using their email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns  
   {Observable<any>} An observable that emits the logged-in user data or an error.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.resourcePath()}?email=${email}&password=${password}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @method setCurrentUser
   * @description Stores the current user's data in local storage.
   * @param {any} user - The user object to store.
   */
  setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  /**
   * @method getCurrentUser
   * @description Retrieves the current user's data from local storage.
   * @returns {any} The current user object or null if not found.
   */
  getCurrentUser(): any {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * @method logout
   * @description Logs the current user out by removing their data from
   * local storage and navigating to the login page.
   */
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['LogIn']).then();
  }

}
