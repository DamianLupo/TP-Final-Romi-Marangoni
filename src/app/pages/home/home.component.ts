import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroHomeComponent } from '../../components/hero-home/hero-home.component';
import { ListProductosComponent } from '../../components/list-productos/list-productos.component';
import { NavbarHomeComponent } from "../../components/navbar-home/navbar-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroHomeComponent, NavbarHomeComponent, ListProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  
}
