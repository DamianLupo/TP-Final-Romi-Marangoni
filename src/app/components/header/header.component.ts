import { Component, inject, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit{
  constructor(private menuStateService: MenuStateService) {}
  ngOnInit(): void {
    this.isAdmin();
  }

  toggleMenu() {
    this.menuStateService.openMenu();
  }
  usuariosService = inject(UsuarioService);
  verificador=false;
  usuario = this.usuariosService.usuarioEnSesion;
  isLogged = this.usuario !== undefined;
  logout() {
    this.usuariosService.cerrarSesion();
  }
  isAdmin()
  {
    if(this.usuario?.isAdmin)
    {
      this.verificador=true;
    }
    else
    {
      false
    }
  } 
}
