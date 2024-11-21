import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ListProductosComponent } from "./components/list-productos/list-productos.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InicioSesionComponent, FooterComponent, HeaderComponent, ListProductosComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  router = inject(Router);
  title = 'tp-final';
}


