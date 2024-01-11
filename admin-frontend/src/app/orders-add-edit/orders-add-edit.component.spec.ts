import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAddEditComponent } from './orders-add-edit.component';

describe('OrdersAddEditComponent', () => {
  let component: OrdersAddEditComponent;
  let fixture: ComponentFixture<OrdersAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
