import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface EmailRequest {
  to: string;
  product: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/send-email'; // Updated API endpoint

  constructor(private http: HttpClient) {}

  sendEmail(to: string, product: string, price: number): Observable<any> {
    const emailData: EmailRequest = { to, product, price };
    return this.http.post<any>(this.apiUrl, emailData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
