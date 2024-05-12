import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MethodService {
  //URL="https://design-it-well.onrender.com"
  //URL="http://15.207.201.163:1337"
  //  URL="https://15.207.201.163"
  URL = 'https://dw-backend.onrender.com';
  results = [];
  constructor(private httpClient: HttpClient) {}

  getDesignTag(): Observable<any> {
    return this.httpClient.get<Object>(`${this.URL}/get-design-tags`);
  }

  getMethodCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/method-category`);
  }

  addMethod(data: any): any {
    //design-it-well.onrender.com
    https: console.log('in Post method');
    // console.log(JSON.parse(data))
    return this.httpClient.post(`${this.URL}/admin`, data);
  }

  updateMethod(data: any, id: number) {
    return this.httpClient.put(`${this.URL}/methods/${id}`, data);
  }

  deleteMethod(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL}/method/${id}`);
  }

  getList(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/methods`);
  }

  getMethod(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/admin/method/${id}`);
  }

  getValue() {
    return this.results;
  }

  setValue(value) {
    this.results = value;
  }
}
