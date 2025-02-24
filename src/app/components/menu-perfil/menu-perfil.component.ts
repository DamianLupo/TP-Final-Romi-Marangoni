import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';
import { UsuarioService } from '../../service/usuario.service';
import { UserConfigurationComponent } from '../user-configuration/user-configuration.component';
@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [CommonModule, UserConfigurationComponent, ReactiveFormsModule],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.css'
})
export class MenuPerfilComponent implements OnInit {
  isOpen: boolean = false;
  isOpenConfiguration: boolean = false;
  closeConfiguration: boolean = false;
  openPasswordModification: boolean = false;
  openPasswordDelete: boolean = false;
  fb = inject(FormBuilder);
  passwordForm = this.fb.nonNullable.group({
    password: ['', Validators.required]
  });
  toggleMenu() {
    this.menuStateService.closeMenu();
    this.openPasswordModification=false;
    this.openPasswordDelete=false;
    this.closeConfiguration=false;
    this.isOpenConfiguration=false;
    this.passwordForm.reset();
  }
  toggleConfiguration()
  {
    this.isOpenConfiguration=!this.isOpenConfiguration;
  }
  ngOnInit(): void {
    this.menuStateService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.usuariosService.initializeUsuarioEnSesion();
  }
  usuariosService = inject(UsuarioService);
  usuario = this.usuariosService.obtenerUsuarioDeLocalStorage;
  isLogged = this.usuario !== undefined;
  constructor(private router: Router, private menuStateService: MenuStateService){}
  requestPassword()
  {

    let password = this.passwordForm.get('password')?.value;
        if (password === null || password !== this.usuariosService.usuarioEnSesion?.password) {
            return; // Salir del método si se cancela
        }
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
