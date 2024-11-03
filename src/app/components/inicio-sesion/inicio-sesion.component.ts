import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  verificador = true;
  fb = inject(FormBuilder);
  usuariosService = inject(UsuarioService);
  formulario = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(5)]]
  });

  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe();
    this.usuariosService.initializeGoogleAuth();
  }

  logIn(usuario: { email: string; password: string }) {
    this.verificador = true;
    this.usuariosService.returnbyEmail(usuario.email);
    if (this.usuariosService.usuarioEnSesion) {
      this.verificador = this.usuariosService.verificarForm(usuario);
    } else {
      this.verificador = false;
    }
  }

  onLogin() {
    this.logIn(this.formulario.getRawValue());
    if (!this.verificador || this.formulario.invalid) return;
    console.log(`USUARIO EN LOGIN: ${this.usuariosService.usuarioEnSesion}`);
    this.router.navigate(['/home']);
  }
  onGoogleSignIn() {
    this.usuariosService.getGoogleUserProfile().then((usuario: { id: string; email: string; nombre: string }) => {
      console.log('Usuario autenticado:', usuario);
      // Aquí decides cómo manejar el objeto `usuario`
    }).catch((error: any) => {
      console.error('Error al iniciar sesión con Google:', error);
    });
  }
}
