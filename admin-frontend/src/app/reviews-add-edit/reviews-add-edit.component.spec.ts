import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsAddEditComponent } from './reviews-add-edit.component';

describe('ReviewsAddEditComponent', () => {
  let component: ReviewsAddEditComponent;
  let fixture: ComponentFixture<ReviewsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
