import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

declare var gapi: any; // Declarar `gapi` globalmente para evitar errores
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}
  urlBase: string = "http://localhost:3000/Usuarios"
  usuarioEnSesion: Usuario|undefined
  
  usuarios: Usuario[]=[]
  initializeUsuarioEnSesion(): void {
    this.usuarioEnSesion = this.obtenerUsuarioDeLocalStorage(); //Guardo el usuario del local storage para no perderlo entre la navegacion de paginas
  }
  private obtenerUsuarioDeLocalStorage(): Usuario | undefined {
    const usuarioGuardado = localStorage.getItem('usuarioEnSesion');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : undefined;  //Obtengo el usuario guardado en el local storage
  }
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
   localStorage.setItem('usuarioEnSesion', JSON.stringify(this.usuarioEnSesion));
  }
  addUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.urlBase}`, usuario);
  }
  initializeGoogleAuth() {
    if (typeof gapi !== 'undefined') {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
    } else {
      console.error('Google API client library not loaded.');
    }
  }

  getGoogleUserProfile() {
    const authInstance = gapi.auth2.getAuthInstance();
    return authInstance.signIn().then((googleUser: any) => {
      const profile = googleUser.getBasicProfile();
      return {
        id: profile.getId(),
        email: profile.getEmail(),
        nombre: profile.getName(),
      };
    });
  }
  cerrarSesion(): void {
    this.usuarioEnSesion = undefined;
    localStorage.removeItem('usuarioEnSesion');
  }
  putUser (user: Usuario | undefined, id: String | undefined): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlBase}/${id}`, user);
  }
  deleteUser(id: string | undefined): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
  setID(){
    return Number(this.usuarios[this.usuarios.length - 1].id) + 1;
  }
  isAdmin(): boolean{
    let verificador = false;
    if(this.usuarioEnSesion){
      if(this.usuarioEnSesion.isAdmin){
        verificador = true;
      }
    }
    return verificador;
}
}


