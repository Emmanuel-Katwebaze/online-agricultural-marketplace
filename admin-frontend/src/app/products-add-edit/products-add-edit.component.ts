import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesAddEditComponent } from '../categories-add-edit/categories-add-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ProductsService } from '../services/products/products.service';
import { CategoriesService } from '../services/categories/categories.service';

@Component({
  selector: 'app-products-add-edit',
  templateUrl: './products-add-edit.component.html',
  styleUrl: './products-add-edit.component.css'
})
export class ProductsAddEditComponent implements OnInit{
  productForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoriesService,
    private _productService: ProductsService,
    private _dialogRef: MatDialogRef<ProductsAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.productForm = this._fb.group({
      name: '',
      description: '',
      price: '',
      quantity: '',
      imageUrl: '',
      dateAdded: '',
      category: null,
      categoryOptions: [], // Initialize with an empty array
    });
    
  }

  ngOnInit(): void {
    this._categoryService.getCategoryList().subscribe((categories: any[]) => {
      this.productForm.patchValue({
        categoryOptions: categories,
        category: this.data ? this.data.category.categoryId : null // Set the initial value for editing
      });
    });
  
    if (this.data) {
      this.productForm.patchValue(this.data);
    }
  }
  

  onFormSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      // console.log(formData)
      const payload = {
        category: {
          categoryId: formData.category,
        },
        name: formData.name,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        imageUrl: formData.imageUrl,
        dateAdded: formData.dateAdded,
      };
  
      if (this.data) {
        this._productService
          .updateProduct(this.data.productId, payload)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Product detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._productService.addProduct(payload).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Product added successfully');
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
