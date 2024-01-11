import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CategoriesService } from '../services/categories/categories.service';

@Component({
  selector: 'app-categories-add-edit',
  templateUrl: './categories-add-edit.component.html',
  styleUrl: './categories-add-edit.component.css'
})
export class CategoriesAddEditComponent implements OnInit{
  categoryForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoriesService,
    private _dialogRef: MatDialogRef<CategoriesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.categoryForm = this._fb.group({
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.categoryForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.categoryForm.valid) {
      if (this.data) {
        this._categoryService
          .updateCategory(this.data.categoryId, this.categoryForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Category detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._categoryService.addCategory(this.categoryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Category added successfully');
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
