import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { OrdersService } from '../services/orders/orders.service';
import { OrdersAddEditComponent } from '../orders-add-edit/orders-add-edit.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'orderDate',
    'totalAmount',
    'status',
    'user',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _orderService: OrdersService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getOrdersList();
  }

  openAddEditOrdersForm() {
    const dialogRef = this._dialog.open(OrdersAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrdersList();
        }
      },
    });
  }


  getOrdersList() {
    this._orderService.getOrderList().subscribe({
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

  deleteOrder(id: number) {
    this._orderService.deleteOrder(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Category deleted!', 'done');
        this.getOrdersList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(OrdersAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrdersList();
        }
      },
    });
  }
}
