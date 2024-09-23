import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRecomComponent } from './course-recom.component';

describe('CourseRecomComponent', () => {
  let component: CourseRecomComponent;
  let fixture: ComponentFixture<CourseRecomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseRecomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseRecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
