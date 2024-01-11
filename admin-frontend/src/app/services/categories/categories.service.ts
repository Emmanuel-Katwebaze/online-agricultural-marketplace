import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) {}

  addCategory(data: any): Observable<any> {
    return this._http.post('http://localhost:8082/api/categories', data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8082/api/categories/${id}`, data);
  }

  getCategoryList(): Observable<any> {
    return this._http.get('http://localhost:8082/api/categories');
  }

  deleteCategory(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/api/categories/${id}`);
  }
}
