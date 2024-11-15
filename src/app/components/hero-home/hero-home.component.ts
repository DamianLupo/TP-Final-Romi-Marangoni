import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-hero-home',
  standalone: true,
  imports: [],
  templateUrl: './hero-home.component.html',
  styleUrl: './hero-home.component.css'
})
export class HeroHomeComponent {
  constructor(private router: Router){}
  usuarioService = inject(UsuarioService);
  stringBuscar!: string
  buscar(searchValue: string){
    if(searchValue.length>0){
      this.stringBuscar=searchValue;
      console.log("stringBuscar", this.stringBuscar);
      this.router.navigate([`/searchProducts`], {state: {stringBuscar: this.stringBuscar}});
    }
    else{
      return;
    }
  }
  toRegister(){
    if(!this.usuarioService.usuarioEnSesion){
      this.router.navigate([`/register`]);
    }
    else{
      this.router.navigate([`/login`]);
    }
  }
}
