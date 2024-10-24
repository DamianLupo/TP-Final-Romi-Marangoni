import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../interface/usuario.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  urlBase: string = "http://localhost:3000/Usuarios"
  getUsuarios(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.urlBase)
  }
  getUsuariobyMail(email:string): Observable<Usuario | undefined>{
    return this.http.get<Usuario[]>(this.urlBase)
  .pipe(
    map((usuarios: Usuario[]) => usuarios.find(usuario => usuario.email === email))
  );
  }
}
