import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interface/usuario.interface';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  usuariosService = inject(UsuarioService);

  registerForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]], 
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    numDeTelefono: ['', [Validators.required]],
    rutinas: [[]],
    productos: []
  });
  router = inject(Router);
  verificadorMail: boolean = false;

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe();
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const newUser: Usuario = {
      id: "" + (this.usuariosService.setID()),
      ...this.registerForm.getRawValue(),
      numDeTelefono: Number(this.registerForm.getRawValue().numDeTelefono)
    };
    this.usuariosService.returnbyEmail(newUser.email);
    if(this.usuariosService.usuarioEnSesion)
    {
      this.verificadorMail=true;
    }
    if(this.verificadorMail)return;

   

    this.usuariosService.addUsuario(newUser).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (e : Error) => {
        console.error('Error al registrar el usuario:', e);
      }
    });
  }
}
