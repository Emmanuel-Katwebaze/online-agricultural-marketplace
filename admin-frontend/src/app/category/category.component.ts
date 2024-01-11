import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { CategoriesService } from '../services/categories/categories.service';
import { CategoriesAddEditComponent } from '../categories-add-edit/categories-add-edit.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _categoryService: CategoriesService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  openAddEditCategoriesForm() {
    const dialogRef = this._dialog.open(CategoriesAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategoryList();
        }
      },
    });
  }


  getCategoryList() {
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(id: number) {
    this._categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Category deleted!', 'done');
        this.getCategoryList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CategoriesAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategoryList();
        }
      },
    });
  }
}
