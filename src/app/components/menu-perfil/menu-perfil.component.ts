import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.css'
})
export class MenuPerfilComponent implements OnInit {
  ngOnInit(): void {
    this.usuariosService.initializeUsuarioEnSesion(); // Llama a la función para inicializar el usuario en sesión
  }
  usuariosService = inject(UsuarioService);
  constructor(private router: Router, private ngZone: NgZone){}
  requestPassword()
  {
    let password: string | null; 
    do {
        password = prompt('Ingrese su contraseña:');
        if (password === null) {
            alert('Se ha cancelado la operación.'); // Alerta si se cancela
            return; // Salir del método si se cancela
        }
        if (password !== this.usuariosService.usuarioEnSesion!.password) {
            alert('Contraseña incorrecta. Inténtalo de nuevo.'); // Alerta si es incorrecta
        }
    } while (password !== this.usuariosService.usuarioEnSesion!.password); 
    return true;
  }
  accesToConfiguration()
  {
    let verificar=this.requestPassword()
    if(verificar)
    {
      this.router.navigate([`/configuration/${this.usuariosService.usuarioEnSesion!.id}`]);

    }
  }
  accesToDelete()
  {
    let verificar=this.requestPassword()
    if(verificar)
    {
      this.usuariosService.deleteUser(this.usuariosService.usuarioEnSesion!.id).subscribe(
        {
          next: ()=>{
            console.log("Usuario eliminado");
          },
          error: (e : Error) => {
            console.error('Error al actualizar el usuario:', e);
          }
        }

      );
      this.router.navigate(['']);
    }
  }
}
