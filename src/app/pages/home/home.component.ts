import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroHomeComponent } from '../../components/hero-home/hero-home.component';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { NavbarHomeComponent } from "../../components/navbar-home/navbar-home.component";
import { ListProductosComponent } from '../../components/list-productos/list-productos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroHomeComponent, NavbarHomeComponent, MenuPerfilComponent, ListProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  
}
