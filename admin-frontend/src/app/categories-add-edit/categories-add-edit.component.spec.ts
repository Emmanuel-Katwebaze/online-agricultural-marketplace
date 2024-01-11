import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAddEditComponent } from './categories-add-edit.component';

describe('CategoriesAddEditComponent', () => {
  let component: CategoriesAddEditComponent;
  let fixture: ComponentFixture<CategoriesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
