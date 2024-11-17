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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSignUp() {
    this.router.navigate(['Register']).then();
  }

  /**
   * @method onSubmit
   * @description This method is called when the user submits the login form. It will attempt to log the user in using the
   * provided credentials. If the login is successful, the user will be redirected to the dashboard. If the login fails, an
   * error message will be displayed to the user.
   * @returns void
   */

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.errorMessage = '';

      this.authService.login(email, password).subscribe({
        next: (user: any) => {
          if (user) {
            this.authService.setCurrentUser(user);

            this.authService.setIsTutor(user.roleType === 'teacher');

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
