import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTutoringDialogComponent } from '../add-tutoring-dialog/add-tutoring-dialog.component';
import {Router} from "@angular/router";
import {RegisterService} from "../../../../public/services/register.service";
import {AuthService} from "../../../../public/services/Auth.service";
import {FormControl} from "@angular/forms";
import {map, Observable, of, startWith, Subject, takeUntil} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isTutor: boolean = false;
  currentUser: any;

  /**
   * Form control for managing the search input.
   */
  searchControl = new FormControl();

  /**
   * An observable containing the filtered semesters based on search input.
   */
  filteredSemesters: Observable<any[]> = of([]);
  semesters = [
    { id: 1, labelKey: 'footer.softwareSemester1' },
    { id: 2, labelKey: 'footer.softwareSemester2' },
    { id: 3, labelKey: 'footer.softwareSemester3' },
    { id: 3, labelKey: 'footer.softwareSemester4' },
    { id: 4, labelKey: 'footer.softwareSemester5' },
    { id: 4, labelKey: 'footer.softwareSemester6' },
    { id: 5, labelKey: 'footer.softwareSemester7' },
    { id: 5, labelKey: 'footer.softwareSemester8' },
    { id: 6, labelKey: 'footer.softwareSemester9' },
    { id: 6, labelKey: 'footer.softwareSemester10' },
    { id: 7, labelKey: 'footer.softwareSemester11' },
    { id: 7, labelKey: 'footer.softwareSemester12' },
    { id: 8, labelKey: 'footer.softwareSemester13' },
    { id: 8, labelKey: 'footer.softwareSemester14' }
  ];

  /**
   * A private subject used to trigger unsubscription when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Initializes the component, setting up initial values for user data and semester filtering.
   *
   * @param dialog - MatDialog service to open dialogs.
   * @param router - Router service to navigate to different views.
   * @param registerService - Service to manage user registration data.
   * @param authService - Service to manage user authentication.
   * @param translateService - Service to handle translations.
   */
  constructor(private dialog: MatDialog,private router: Router, private registerService: RegisterService,private authService: AuthService,private translateService: TranslateService) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.roleType === 'teacher') {
      this.isTutor = true;
    } else {
      this.isTutor = this.authService.getIsTutor();
      }
  }

  /**
   * Lifecycle hook to initialize the component. Sets up filtering and subscription to search input changes.
   *
   * @returns void
   */
  ngOnInit() {
    this.filteredSemesters = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSemesters(value || ''))
    );

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        const selectedSemester = this.semesters.find(semester => semester.labelKey === value);
        if (selectedSemester) {
          this.router.navigate(['/courses', selectedSemester.id]).then();
        }
      });

    const userRole = this.registerService.getUserRole();
    this.isTutor = userRole === 'teacher';
    this.isTutor = this.authService.getIsTutor();
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }

  }

  /**
   * Lifecycle hook to clean up any resources before the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Filters the list of semesters based on the search input.
   *
   * @param value - The value to filter the semesters by.
   * @returns Array of filtered semesters.
   */
  filterSemesters(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.semesters.filter(semester =>
      semester.labelKey.toLowerCase().includes(filterValue) ||
      this.translateService.instant(semester.labelKey).toLowerCase().includes(filterValue)
    );
  }

  /**
   * Handles the selection of a semester from the autocomplete dropdown.
   * Navigates to the corresponding semester's course page.
   *
   * @param labelKey - The label key of the selected semester.
   * @returns void
   */
  onSemesterSelect(labelKey: string) {
    const selectedSemester = this.semesters.find(semester => semester.labelKey === labelKey);
    if (selectedSemester) {
      this.router.navigate(['/courses', selectedSemester.id]).then();
    }
  }

  /**
   * Handles the search action. If a semester is found that matches the search term,
   * navigates to the corresponding course page.
   *
   * @returns void
   */
  onSearch() {
    const value = this.searchControl.value;
    const selectedSemester = this.semesters.find(semester =>
      semester.labelKey.toLowerCase() === value.toLowerCase() ||
      this.translateService.instant(semester.labelKey).toLowerCase() === value.toLowerCase()
    );
    if (selectedSemester) {
      this.router.navigate(['/courses', selectedSemester.id]).then();
    } else {
      console.log('An exact semester was not found for:', value);
    }
  }

  /**
   * Opens the dialog to add a new tutoring session.
   *
   * @returns void
   */
  openAddTutoringDialog(): void {
    const dialogRef = this.dialog.open(AddTutoringDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Result of the dialogue:', result);
      }
    });
  }

  /**
   * Navigates to the settings page.
   *
   * @returns void
   */
  navigateToSettings() {
    this.router.navigate(['/Settings']).then();
  }

  /**
   * Navigates to the user's profile page.
   *
   * @returns void
   */
  navigateToProfile() {
    this.router.navigate(['/Profile']).then();
  }

  /**
   * Navigates to Dashboard page.
   * @returns void
   */
  navigateToDashboard() {
    this.router.navigate(['/Dashboard']).then();
  }
  /**
   * Logs the user out and redirects to the login page.
   *
   * @returns void
   */
  onLogout() {
    this.authService.logout();
    this.router.navigate(['LogIn']).then();
  }

}
