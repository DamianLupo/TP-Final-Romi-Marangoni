import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http : HttpClient) { }

  urlBase : string = "http://localhost:3500/productos";

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlBase);
  }

  postProducto(producto: Producto):Observable<Producto>{
    return this.http.post<Producto>(this.urlBase, producto);
  }

  deleteProducto(id: number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlBase}/${id}`);
  }
  getProducto(id: string | null):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlBase}/${id}`);
  }
}
