import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatLabel

  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  /**
   * @property currentUser {any}
   * @description Holds the current user's data.
   */
  currentUser: any;


  /**
   * @constructor
   * @param {FormBuilder} fb - An instance of FormBuilder for creating form groups.
   * @param {RegisterService} registerService - An instance of RegisterService for user management.
   * @param {Router} router - An instance of Router for navigation.
   */
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      avatar: [null],
      gender: [null],
      cycle: [null]
    });
  }


  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component's constructor.
   */
  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.populateForm();
    }
  }

  /**
   * @method populateForm
   * @description Populates the settings form with the current user's data.
   */
  populateForm() {
    this.settingsForm.patchValue({
      avatar: this.currentUser.avatar,
      gender: this.currentUser.gender,
      cycle: this.currentUser.cycle
    });
  }

  /**
   * @method onSave
   * @description Handles the form submission for saving user settings.
   */
  onSave() {
    if (this.settingsForm.valid) {
      const updatedUser = {
        ...this.currentUser,
        ...this.settingsForm.value
      };
      /**
       * @description Calls the registerService to update the user information.
       */
      this.registerService.updateUser(updatedUser, this.currentUser.id).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['Dashboard']).then();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * @method onFileSelected
   * @description Handles the file selection event for the avatar upload.
   * @param {any} event - The file selection event object.
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.settingsForm.patchValue({ avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

}
