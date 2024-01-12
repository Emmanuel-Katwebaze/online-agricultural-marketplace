import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _http: HttpClient) {}

  addReview(data: any): Observable<any> {
    return this._http.post('http://localhost:8082/api/reviews', data);
  }

  updateReview(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8082/api/reviews/${id}`, data);
  }

  getReviewList(): Observable<any> {
    return this._http.get('http://localhost:8082/api/reviews');
  }

  deleteReview(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/api/reviews/${id}`);
  }
}
