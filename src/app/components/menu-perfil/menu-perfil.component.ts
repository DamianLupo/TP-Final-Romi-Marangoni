import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';
import { UsuarioService } from '../../service/usuario.service';
import { UserConfigurationComponent } from '../user-configuration/user-configuration.component';
@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [CommonModule, UserConfigurationComponent],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.css'
})
export class MenuPerfilComponent implements OnInit {
  isOpen: boolean = false;
  isOpenConfiguration: boolean = false;
  toggleMenu() {
    this.menuStateService.closeMenu();
    this.isOpenConfiguration=false;
  }
  toggleConfiguration()
  {
    this.isOpenConfiguration=!this.isOpenConfiguration;
  }
  ngOnInit(): void {
    this.menuStateService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
  usuariosService = inject(UsuarioService);
  usuario = this.usuariosService.usuarioEnSesion;
  isLogged = this.usuario !== undefined;
  constructor(private router: Router, private menuStateService: MenuStateService){}
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
      this.toggleConfiguration();
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
