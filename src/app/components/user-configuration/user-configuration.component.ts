import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-user-configuration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css'] // Asegúrate de que el nombre de la propiedad sea styleUrls
})
export class UserConfigurationComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() toggleMenu = new EventEmitter<void>();

  toggleMenuEvent()
  {
    this.toggleMenu.emit();
  }
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

    if (this.usuariosService.usuarioEnSesion) { this.configurationForm.patchValue(this.usuariosService.usuarioEnSesion); } else {
     
      console.error('No hay usuario en sesión');
    }
  }
  updateUser(){
    
    Object.assign(this.usuariosService.usuarioEnSesion!, {...this.configurationForm.getRawValue(), id: this.usuariosService.usuarioEnSesion!.id});
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


