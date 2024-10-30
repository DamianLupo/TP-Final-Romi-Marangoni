import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from './service/usuario.service';

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
    this.initializeGoogleAuth();
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
    this.router.navigate(['/home']);
  }

  // Método para inicializar Google Sign-In
  initializeGoogleAuth() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // reemplaza con tu ID de cliente de Google
        cookiepolicy: 'single_host_origin',
      }).then(() => {
        this.attachSignin(document.getElementById('googleSignInButton')!);
      });
    });
  }

  // Método para vincular el botón de inicio de sesión de Google
  attachSignin(element: HTMLElement) {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        this.ngZone.run(() => {
          console.log('ID: ' + profile.getId());
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
          this.router.navigate(['/home']);
        });
      },
      (error: any) => {
        console.error(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
