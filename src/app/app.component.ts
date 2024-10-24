import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, InicioSesionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-final';
}
