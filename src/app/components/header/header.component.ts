import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';
import { UsuarioService } from '../../service/usuario.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private menuStateService: MenuStateService) {}

  toggleMenu() {
    this.menuStateService.openMenu();
  }
  usuariosService = inject(UsuarioService);
  usuario = this.usuariosService.usuarioEnSesion;
  isLogged = this.usuario !== undefined;
  logout() {
    this.usuariosService.cerrarSesion();
  } 
}
