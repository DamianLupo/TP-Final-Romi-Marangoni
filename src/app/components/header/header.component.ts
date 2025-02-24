import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';
import { UsuarioService } from '../../service/usuario.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  menuStateService = inject(MenuStateService);
  ngOnInit(): void {
    this.isAdmin();
    this.menuStateService.isOpenPopup$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.usuariosService.initializeUsuarioEnSesion();
  }
  isOpen : boolean = false;
  popupState = false;
  toggleMenu() {
    this.menuStateService.openMenu();
  }
  togglePopup() {
    this.popupState = !this.popupState;
  }
  usuariosService = inject(UsuarioService);
  verificador=false;
  usuario = this.usuariosService.obtenerUsuarioDeLocalStorage();
  isLogged = this.usuario !== undefined;
  logout() {
    this.usuariosService.cerrarSesion();
  }
  togglePopUpProductsAndRutins(){
    this.menuStateService.openPopup();
    console.log("open popup");

    console.log(this.isOpen);
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
