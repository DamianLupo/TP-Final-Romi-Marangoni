import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuPerfilComponent } from './components/menu-perfil/menu-perfil.component';
import { PopUpAddComponent } from './components/pop-up-add/pop-up-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, MenuPerfilComponent, HeaderComponent, PopUpAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  router = inject(Router);
  title = 'tp-final';
}
