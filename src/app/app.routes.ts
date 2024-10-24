import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'dashboard', component: DashboardComponent },
];
