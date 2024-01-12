import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

  constructor(private _http: HttpClient) {}

  addOrderItem(data: any): Observable<any> {
    return this._http.post('http://localhost:8082/api/orderItems', data);
  }

  updateOrderItem(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8082/api/orderItems/${id}`, data);
  }

  getOrderItemList(): Observable<any> {
    return this._http.get('http://localhost:8082/api/orderItems');
  }

  deleteOrderItem(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/api/orderItems/${id}`);
  }
}
