import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interface/usuario.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from './service/usuario.service';
import { log } from 'console';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  usuarioQueInicia: Usuario=
  {
    id: 0,
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    rutinas: [],
    productos: [],
    numDeTelefono: 0
  }
  
  verificaciones={
    passwordVerification: true,
    emailVerification:true

  };
  fb = inject(FormBuilder)
  usuariosService=inject(UsuarioService);
  formulario = this.fb.nonNullable.group({
    email: ["",[Validators.required,Validators.email]],
    password: ["",[Validators.required,Validators.minLength(5)]]
  })
  //usuarios: Usuario[] = []; // Asegúrate de inicializar la variable

   
  usuarios: Usuario[]=[]
  ngOnInit(){
    this.usuariosService.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data; // Asigna la respuesta a la variable usuarios
  });
  //this.logIn()
  }
  constructor(private router: Router) {}
  logIn()
  {
    
    const usuario = this.formulario.getRawValue()
    console.log(usuario);
    let usuarioEncontrado= this.returnbyEmail(this.usuarios,usuario.email)
    console.log(`USUARIO FUERA DEL IF DE USUARIO ENCONTRADO ${usuarioEncontrado}`);
    if(usuarioEncontrado)
      {
        console.log("ENTRE ACA ALGUNA VEZ");
        this.usuarioQueInicia=usuarioEncontrado
        console.log(this.usuarioQueInicia);
        this.usuarioQueInicia=usuarioEncontrado;
        console.log(usuario.password+"PASSWORD FORM");
        console.log(this.usuarioQueInicia.password);
        if(this.usuarioQueInicia.email===usuario.email)
          {
            this.verificaciones.emailVerification=true;
          }
          else{
            this.verificaciones.emailVerification=false;
            return;
          }
          if(this.usuarioQueInicia.password===usuario.password)
          {
            this.verificaciones.passwordVerification=true;
          }
          else{
            
            this.verificaciones.passwordVerification=false
            return;
          }
      }
      else{
        this.verificaciones.emailVerification=false;
      }
      
      
  }
  returnbyEmail(usuarios: Usuario[],email:string): Usuario | false {
    const usuarioFind = usuarios.find(usuario => usuario.email === email);
    return usuarioFind ? usuarioFind : false; // Devuelve el usuario encontrado o false
  }
 
  onLogin() {
    
    
    // Perform login logic here
    // If login is successful:
    //console.log(this.formulario);
    if(!this.verificaciones.emailVerification||!this.verificaciones.passwordVerification)return;
    if(this.formulario.invalid) return; ///Me permite retornar y no seguir intentando iniciar sesion
    this.router.navigate(['/dashboard']);
  }
}
