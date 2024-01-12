import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ReviewsService } from '../services/reviews/reviews.service';
import { ReviewsAddEditComponent } from '../reviews-add-edit/reviews-add-edit.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'rating',
    'comment',
    'datePosted',
    'user',
    'product',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _reviewService: ReviewsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getReviewList();
  }

  openAddEditReviewsForm() {
    const dialogRef = this._dialog.open(ReviewsAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getReviewList();
        }
      },
    });
  }


  getReviewList() {
    this._reviewService.getReviewList().subscribe({
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

  deleteReview(id: number) {
    this._reviewService.deleteReview(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Review deleted!', 'done');
        this.getReviewList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ReviewsAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getReviewList();
        }
      },
    });
  }
}
