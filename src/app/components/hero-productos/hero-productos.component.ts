import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-productos',
  standalone: true,
  imports: [],
  templateUrl: './hero-productos.component.html',
  styleUrl: './hero-productos.component.css'
})
export class HeroProductosComponent {
  productos = [
    { 
      nombre: 'Creatina', 
      imagen: '', 
      precio: 20.99 
    },
    { 
      nombre: 'Proteina', 
      imagen: '', 
      precio: 35.50 
    },
    { 
      nombre: 'Barra', 
      imagen: '', 
      precio: 60.00 
    },
    { 
      nombre: 'Barra', 
      imagen: '', 
      precio: 60.00 
    },
    { 
      nombre: 'Barra', 
      imagen: '', 
      precio: 60.00 
    }
  ];
}
