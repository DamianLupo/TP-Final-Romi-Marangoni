import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
];
