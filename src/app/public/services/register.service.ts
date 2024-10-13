import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
/**
 * @class RegisterService
 * @description This service handles user registration and role management.
 * @extends BaseService<any>
 */
export class RegisterService extends BaseService<any>{

  constructor() {
    super();
    this.resourceEndPoint='/users'
  }

  /**
   * @property userRole {string}
   * @description Stores the current user's role.
   */
  private userRole: string = '';

  /**
   * @method setUserRole
   * @description Sets the current user's role.
   * @param {string} role - The user's role.
   */
  setUserRole(role: string) {
    this.userRole = role;
  }

  /**
   * @method getUserRole
   * @description Gets the current user's role.
   * @returns {string} The user's role.
   */
  getUserRole(): string {
    return this.userRole;
  }

}
