import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutoringDialogComponent } from './add-tutoring-dialog.component';

describe('AddTutoringDialogComponent', () => {
  let component: AddTutoringDialogComponent;
  let fixture: ComponentFixture<AddTutoringDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTutoringDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTutoringDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
