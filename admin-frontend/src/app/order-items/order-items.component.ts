import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { OrderItemsService } from '../services/order-items/order-items.service';
import { OrderItemsAddEditComponent } from '../order-items-add-edit/order-items-add-edit.component';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'quantity',
    'subtotal',
    'order',
    'product',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _orderItemService: OrderItemsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getOrderItemList();
  }

  openAddEditOrdersForm() {
    const dialogRef = this._dialog.open(OrderItemsAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrderItemList();
        }
      },
    });
  }


  getOrderItemList() {
    this._orderItemService.getOrderItemList().subscribe({
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

  deleteOrderItem(id: number) {
    this._orderItemService.deleteOrderItem(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('OrderItem deleted!', 'done');
        this.getOrderItemList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(OrderItemsAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrderItemList();
        }
      },
    });
  }

}
