import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrettingComponent } from './gretting.component';

describe('GrettingComponent', () => {
  let component: GrettingComponent;
  let fixture: ComponentFixture<GrettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
