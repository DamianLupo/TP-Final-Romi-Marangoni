import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroHomeComponent } from '../../components/hero-home/hero-home.component';
import { NavbarHomeComponent } from "../../components/navbar-home/navbar-home.component";
import { HeroProductosComponent } from "../../components/hero-productos/hero-productos.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroHomeComponent, NavbarHomeComponent, HeroProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
