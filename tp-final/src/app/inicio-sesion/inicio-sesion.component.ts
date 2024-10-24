import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Perform login logic here
    // If login is successful:
    this.router.navigate(['/dashboard']);
  }
}
