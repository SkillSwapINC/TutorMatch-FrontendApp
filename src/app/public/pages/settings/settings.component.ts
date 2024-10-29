import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgIf, NgOptimizedImage} from "@angular/common";

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
    MatLabel,
    TranslateModule,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentUser: any;
  imageUploaded: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.settingsForm = this.fb.group({
      avatar: [null],
      gender: [null],
      cycle: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.populateForm();
    }
  }

  populateForm() {
    this.settingsForm.patchValue({
      avatar: this.currentUser.avatar,
      gender: this.currentUser.gender,
      cycle: this.currentUser.cycle
    });
  }

  onSave() {
    if (this.settingsForm.valid) {
      const updatedUser = {
        ...this.currentUser,
        ...this.settingsForm.value
      };
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.settingsForm.patchValue({ avatar: e.target.result });
          this.imageUploaded = true;
          this.errorMessage = '';
        };
        reader.readAsDataURL(file);
      } else {
        this.translate.get('footer.pInvalidFileType').subscribe((res: string) => {
          this.errorMessage = res;
        });
        this.imageUploaded = false;
      }
    }
  }

  onBack(): void {
    this.router.navigate(['/Dashboard']).then(r => console.log('Navigated back to dashboard:', r));
  }
}
