import { Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
];
