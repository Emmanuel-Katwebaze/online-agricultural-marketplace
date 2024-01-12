import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UsersService } from '../services/users/users.service';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-orders-add-edit',
  templateUrl: './orders-add-edit.component.html',
  styleUrl: './orders-add-edit.component.css'
})
export class OrdersAddEditComponent implements OnInit{
  orderForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _orderService: OrdersService,
    private _dialogRef: MatDialogRef<OrdersAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.orderForm = this._fb.group({
      orderDate: '',
      totalAmount: null,
      status: '',
      user: null,
      userOptions: [], // Initialize with an empty array
    });
    
  }

  ngOnInit(): void {
    this._userService.getUserList().subscribe((users: any[]) => {
      this.orderForm.patchValue({
        userOptions: users,
        user: this.data ? this.data.user.userId : null // Set the initial value for editing
      });
    });
  
    if (this.data) {
      this.orderForm.patchValue(this.data);
    }
  }
  

  onFormSubmit() {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      // console.log(formData)
      const payload = {
        user: {
          userId: formData.user,
        },
        orderDate: formData.orderDate,
        totalAmount: formData.totalAmount,
        status: formData.status,
        quantity: formData.quantity
      };
  
      if (this.data) {
        this._orderService
          .updateOrder(this.data.orderId, payload)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Order detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._orderService.addOrder(payload).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Order added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
