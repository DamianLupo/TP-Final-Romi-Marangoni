import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'https://api.mercadopago.com/checkout/preferences';

  constructor(private http: HttpClient) {}

  createPreference(title: string, quantity: number, unitPrice: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.mercadoPagoAccessToken}`,
      'Content-Type': 'application/json'
    });

    const body = {
      items: [
        {
          title,
          quantity,
          unit_price: unitPrice,
          currency_id: 'ARS'
        }
      ],
      back_urls: {
        success: 'https://www.tu-sitio.com/success',
        failure: 'https://www.tu-sitio.com/failure',
        pending: 'https://www.tu-sitio.com/pending'
      },
      auto_return: 'approved'
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
