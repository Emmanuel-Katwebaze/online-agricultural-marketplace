import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsAddEditComponent } from './order-items-add-edit.component';

describe('OrderItemsAddEditComponent', () => {
  let component: OrderItemsAddEditComponent;
  let fixture: ComponentFixture<OrderItemsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemsAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderItemsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
