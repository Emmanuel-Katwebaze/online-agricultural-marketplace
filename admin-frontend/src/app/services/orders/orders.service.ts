import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http: HttpClient) {}

  addOrder(data: any): Observable<any> {
    return this._http.post('http://localhost:8082/api/orders', data);
  }

  updateOrder(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8082/api/orders/${id}`, data);
  }

  getOrderList(): Observable<any> {
    return this._http.get('http://localhost:8082/api/orders');
  }

  deleteOrder(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/api/orders/${id}`);
  }
}
