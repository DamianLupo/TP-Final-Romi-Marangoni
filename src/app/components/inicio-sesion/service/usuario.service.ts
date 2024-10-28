import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  urlBase: string = "http://localhost:3000/Usuarios"
  usuarioEnSesion: Usuario|undefined
  usuarios: Usuario[]=[]
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlBase).pipe(
      tap(data => this.usuarios = data) // Guarda los usuarios cargados
    );
  }
  verificarForm(usuarioForm: {email:string,password:string}) 
  {
    let verificador= false;  
    if(usuarioForm.email===this.usuarioEnSesion?.email)
      {
        if(usuarioForm.password===this.usuarioEnSesion.password)
        {
          verificador=true;
        }
        else{
          verificador=false;
        }
      }
      else{
        verificador=false;
      }
      return verificador;                   //Esto es utilizado en el inicio de sesion, se maneja la logica desde el service
  }
  returnbyEmail(email: string) {
   this.usuarioEnSesion=this.usuarios.find(usuario => usuario.email === email);                   //Retorno el usuario que luego sera cargaro en 
  }
  addUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.urlBase}`, usuario);
  }
}
