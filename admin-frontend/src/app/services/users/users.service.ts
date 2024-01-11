import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:8082/api/users', data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8082/api/users/${id}`, data);
  }

  getUserList(): Observable<any> {
    return this._http.get('http://localhost:8082/api/users');
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/api/users/${id}`);
  }
}
