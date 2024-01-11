import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddEditComponent } from './products-add-edit.component';

describe('ProductsAddEditComponent', () => {
  let component: ProductsAddEditComponent;
  let fixture: ComponentFixture<ProductsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
