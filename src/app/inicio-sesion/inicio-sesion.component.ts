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
  verificador=true
  fb = inject(FormBuilder)
  usuariosService=inject(UsuarioService);
  formulario = this.fb.nonNullable.group({
    email: ["",[Validators.required,Validators.email]],
    password: ["",[Validators.required,Validators.minLength(5)]]
  })

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe();
  }
  logIn(usuario : {email:string,password:string})
  {
    this.verificador=true;
    this.usuariosService.returnbyEmail(usuario.email); //Asigno al usuario del service, el usuario que es encontrado por mail y luego con el service hago la verificacion de si existe o no
    if(this.usuariosService.usuarioEnSesion)
    {
      this.verificador=this.usuariosService.verificarForm(usuario); 
    }
    else{
      this.verificador=false;
    }
    
  }

 
  onLogin() {
    this.logIn(this.formulario.getRawValue());
    if(!this.verificador)return;
    if(this.formulario.invalid) return; ///Me permite retornar y no seguir intentando iniciar sesion
    this.router.navigate(['/dashboard']);
  }
}
