import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this._http.post('http://localhost:8082/api/products', data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    console.log(data)
    return this._http.put(`http://localhost:8082/api/products/${id}`, data);
  }

  getProductList(): Observable<any> {
    return this._http.get('http://localhost:8082/api/products');
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/api/products/${id}`);
  }
}
