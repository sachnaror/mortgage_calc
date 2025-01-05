import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MortgageService {
  private apiUrl = 'http://localhost:3000'; // Backend server URL

  constructor(private http: HttpClient) { }

  // Method to send form data to the backend
  calculateMortgage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate`, data);
  }
}
