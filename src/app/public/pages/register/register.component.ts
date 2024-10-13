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
  registerForm: FormGroup;
  isTutor: boolean = true;
  isStudent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,upcEmailValidator]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }


  onRoleChange(event: any) {
    const selectedRole = event.value;
    this.isTutor = selectedRole === 'teacher';
    this.isStudent = selectedRole === 'student';
  }

  onSignUp() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;


      this.registerService.registerUser(formValues).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['Dashboard']).then();
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onLogin() {
    this.router.navigate(['LogIn']).then();
  }
}
