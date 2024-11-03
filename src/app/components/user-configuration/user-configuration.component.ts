import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-user-configuration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css'] // Asegúrate de que el nombre de la propiedad sea styleUrls
})
export class UserConfigurationComponent implements OnInit {
  constructor(private router: Router, private ngZone: NgZone){}
  fb = inject(FormBuilder);
  usuariosService = inject(UsuarioService);
  
  // Definimos el formulario con valores vacíos por defecto
  configurationForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    numDeTelefono: [0, Validators.required],
  });

  ngOnInit(): void {
    // Inicializa el usuario en sesión
    this.usuariosService.initializeUsuarioEnSesion();

    if (this.usuariosService.usuarioEnSesion) {
      this.configurationForm.patchValue({
        nombre: this.usuariosService.usuarioEnSesion.nombre,
        apellido: this.usuariosService.usuarioEnSesion.apellido,
        username: this.usuariosService.usuarioEnSesion.username,
        email: this.usuariosService.usuarioEnSesion.email,
        password:this.usuariosService.usuarioEnSesion.password,
        numDeTelefono: this.usuariosService.usuarioEnSesion.numDeTelefono
      });
    } else {
     
      console.error('No hay usuario en sesión');
    }
  }
  updateUser(){
    

    this.usuariosService.usuarioEnSesion!.nombre=this.configurationForm.getRawValue().nombre
    this.usuariosService.usuarioEnSesion!.apellido=this.configurationForm.getRawValue().apellido
    this.usuariosService.usuarioEnSesion!.username=this.configurationForm.getRawValue().username
    this.usuariosService.usuarioEnSesion!.email=this.configurationForm.getRawValue().email
    this.usuariosService.usuarioEnSesion!.password=this.configurationForm.getRawValue().password
    this.usuariosService.usuarioEnSesion!.numDeTelefono=this.configurationForm.getRawValue().numDeTelefono
    console.log(this.usuariosService.usuarioEnSesion!.id);
    this.usuariosService.putUser(this.usuariosService.usuarioEnSesion!,this.usuariosService.usuarioEnSesion!.id).subscribe(
      {
        next: ()=>{
          console.log("Usuario actualizado");
        },
        error: (e : Error) => {
          console.error('Error al actualizar el usuario:', e);
        }
      }
    )
    console.log(this.configurationForm.invalid);
    if(this.configurationForm.invalid) return;
    localStorage.setItem('usuarioEnSesion', JSON.stringify(this.usuariosService.usuarioEnSesion));
    this.router.navigate(['/home']);
  }
}


