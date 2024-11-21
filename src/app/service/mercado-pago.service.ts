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

  createPreference(title: string, quantity: number, unitPrice: number, productId: string | any): Observable<any> {
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
      external_reference: productId, // Agregamos el ID del producto aquí
      back_urls: {
        success: 'http://localhost:4200/success', // Actualiza estas URLs según tu entorno
        failure: 'http://localhost:4200/failure',
        pending: 'http://localhost:4200/pending'
      },
      auto_return: 'approved'
    };
  
    return this.http.post(this.apiUrl, body, { headers });
  }

  
  checkPaymentStatus(paymentId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.mercadoPagoAccessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, { headers });
  }
}
