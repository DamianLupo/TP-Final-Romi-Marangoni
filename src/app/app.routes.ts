import { Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuPerfilComponent } from './components/menu-perfil/menu-perfil.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {path: 'menu', component: MenuPerfilComponent},
  {path:'configuration/:id',component: UserConfigurationComponent},
  {path:'sobre-nosotros', component: AboutUsComponent}
];
