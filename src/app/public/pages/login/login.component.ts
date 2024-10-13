import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {LanguageSwitcherComponent} from "../../components/language-switcher/language-switcher.component";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AuthService} from "../../services/Auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon, MatIconButton, MatMenuTrigger, LanguageSwitcherComponent, MatMenu, TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  /**
   * @constructor
   * @param {FormBuilder} fb - An instance of FormBuilder for creating form groups.
   * @param {AuthService} authService - An instance of AuthService for authentication services.
   * @param {Router} router - An instance of Router for navigation.
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * @method onSignUp
   * @description Navigates to the register route for user sign-up.
   */
  onSignUp(){
    this.router.navigate(['Register']).then()
  }

  /**
   * @method onSubmit
   * @description Handles the form submission for login.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.errorMessage = '';
      /**
       * @description Attempts to login with the provided credentials using the AuthService.
       */
      this.authService.login(email, password).subscribe({
        next: (users: any[]) => {
          if (users.length > 0) {
            const user = users[0];
            this.authService.setCurrentUser(user);

            this.router.navigate(['Dashboard']).then();
          } else {
            this.errorMessage = 'Invalid credentials. Please try again.';
          }
        },
        error: (error) => {
          console.error('Error logging in', error);
          this.errorMessage = 'An error occurred. Please try again later.';
        },
        complete: () => {
          console.log('Authentication process completed.');
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
