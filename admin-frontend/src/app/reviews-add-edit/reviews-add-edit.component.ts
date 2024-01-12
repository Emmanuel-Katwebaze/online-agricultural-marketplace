import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UsersService } from '../services/users/users.service';
import { ProductsService } from '../services/products/products.service';
import { ReviewsService } from '../services/reviews/reviews.service';

@Component({
  selector: 'app-reviews-add-edit',
  templateUrl: './reviews-add-edit.component.html',
  styleUrl: './reviews-add-edit.component.css'
})
export class ReviewsAddEditComponent implements OnInit{
  reviewForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _productService: ProductsService,
    private _reviewService: ReviewsService,
    private _dialogRef: MatDialogRef<ReviewsAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.reviewForm = this._fb.group({
      id: '',
      rating: null,
      comment: '',
      datePosted: '',
      user: null,
      userOptions: [], 
      product: null,
      productOptions: []
    });
    
  }

  ngOnInit(): void {
    this._userService.getUserList().subscribe((users: any[]) => {
      this.reviewForm.patchValue({
        userOptions: users,
        user: this.data ? this.data.user.userId : null 
      });
    });
    this._productService.getProductList().subscribe((products: any[]) => {
      this.reviewForm.patchValue({
        productOptions: products,
        product: this.data ? this.data.product.productId : null 
      });
    });
  
    if (this.data) {
      this.reviewForm.patchValue(this.data);
    }
  }
  

  onFormSubmit() {
    if (this.reviewForm.valid) {
      const formData = this.reviewForm.value;
      // console.log(formData)
      const payload = {
        user: {
          userId: formData.user,
        },
        product: {
          productId: formData.product,
        },
        rating: formData.rating,
        comment: formData.comment,
        datePosted: formData.datePosted,
      };
  
      if (this.data) {
        this._reviewService
          .updateReview(this.data.reviewId, payload)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Review detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._reviewService.addReview(payload).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Review added successfully');
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
