import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {LanguageSwitcherComponent} from "../../components/language-switcher/language-switcher.component";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {Router} from "@angular/router";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgIf} from "@angular/common";
import { upcEmailValidator } from './upcEmailValidator';
import {TranslateModule} from "@ngx-translate/core";
import {RegisterService} from "../../services/register.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    LanguageSwitcherComponent,
    MatMenu,
    MatMenuTrigger,
    MatCard,
    MatCardTitle,
    FormsModule,
    MatFormField,
    MatCheckbox,
    MatInput,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioGroup, MatRadioButton, ReactiveFormsModule, NgIf, TranslateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  /**
   * @property registerForm {FormGroup}
   * @description The reactive form group for user registration data.
   */
  registerForm: FormGroup;

  /**
   * @property isTutor {boolean}
   * @description Flag indicating whether the selected role is "teacher".
   * @property isStudent {boolean}
   * @description Flag indicating whether the selected role is "student".
   */
  isTutor: boolean = false;
  isStudent: boolean = false;

  /**
   * @private static tutorId: number
   * @description A static counter used to generate unique tutor IDs.
   */
  private static tutorId: number = 1;


  /**
   * @constructor
   * @param {FormBuilder} fb - An instance of FormBuilder for creating form groups.
   * @param {Router} router - An instance of Router for navigation.
   * @param {RegisterService} registerService - An instance of RegisterService for user registration and role management.
   */
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private registerService: RegisterService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, upcEmailValidator]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  /**
   * @method onRoleChange
   * @description Handles the change event for the role selection dropdown.
   * @param {any} event - The change event object.
   */
  onRoleChange(event: any) {
    const selectedRole = event.value;
    this.isTutor = selectedRole === 'teacher';
    this.isStudent = selectedRole === 'student';
  }

  /**
   * @method onSignUp
   * @description Handles the form submission for user registration.
   */
  onSignUp() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      this.registerService.setUserRole(formValues.role);
      let userToRegister: any = {
        ...formValues,
        avatar: null,
        gender: null,
        cycle: null
      };

      if (formValues.role === 'teacher') {
        userToRegister.tutorId = this.generateTutorId();
      }

      this.registerService.registerUser(userToRegister).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          if (formValues.role === 'student') {
            this.router.navigate(['Dashboard']).then();
          } else if (formValues.role === 'teacher') {
            this.router.navigate(['Plans']).then();
          }
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * @method private generateTutorId
   * @description Generates a unique ID for newly registered tutors.
   * @returns {number} - The generated tutor ID.
   */
  private generateTutorId(): number {
    return RegisterComponent.tutorId++;
  }

  /**
   * @method onLogin
   * @description Navigates to the login route.
   */
  onLogin() {
    this.router.navigate(['LogIn']).then();
  }

}
