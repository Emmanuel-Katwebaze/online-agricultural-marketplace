import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ProductsService } from '../services/products/products.service';
import { OrdersService } from '../services/orders/orders.service';
import { OrderItemsService } from '../services/order-items/order-items.service';

@Component({
  selector: 'app-order-items-add-edit',
  templateUrl: './order-items-add-edit.component.html',
  styleUrl: './order-items-add-edit.component.css'
})
export class OrderItemsAddEditComponent implements OnInit{
  orderItemForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _orderService: OrdersService,
    private _productService: ProductsService,
    private _orderItemService: OrderItemsService,
    private _dialogRef: MatDialogRef<OrderItemsAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.orderItemForm = this._fb.group({
      id: '',
      quantity: null,
      subtotal: null,
      order: null,
      orderOptions: [], 
      product: null,
      productOptions: []
    });
    
  }

  ngOnInit(): void {
    this._orderService.getOrderList().subscribe((orders: any[]) => {
      this.orderItemForm.patchValue({
        orderOptions: orders,
        order: this.data ? this.data.order.orderId : null 
      });
    });
    this._productService.getProductList().subscribe((products: any[]) => {
      this.orderItemForm.patchValue({
        productOptions: products,
        product: this.data ? this.data.product.productId : null 
      });
    });
  
    if (this.data) {
      this.orderItemForm.patchValue(this.data);
    }
  }
  

  onFormSubmit() {
    if (this.orderItemForm.valid) {
      const formData = this.orderItemForm.value;
      // console.log(formData)
      const payload = {
        order: {
          orderId: formData.order,
        },
        product: {
          productId: formData.product,
        },
        quantity: formData.quantity,
        subtotal: formData.subtotal,
      };
  
      if (this.data) {
        this._orderItemService
          .updateOrderItem(this.data.orderItemId, payload)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Order Item detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._orderItemService.addOrderItem(payload).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('OrderItem added successfully');
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
