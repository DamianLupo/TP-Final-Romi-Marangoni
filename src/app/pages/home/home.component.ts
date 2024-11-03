import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroHomeComponent } from '../../components/hero-home/hero-home.component';
import { HeroProductosComponent } from "../../components/hero-productos/hero-productos.component";
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { NavbarHomeComponent } from "../../components/navbar-home/navbar-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroHomeComponent, NavbarHomeComponent, HeroProductosComponent, MenuPerfilComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  
}
