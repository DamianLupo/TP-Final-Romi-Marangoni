import { Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { PageProductosComponent } from './pages/page-productos/page-productos/page-productos.component';
import { ProductosDetailsComponent } from './productos-details/productos-details.component';

export const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {path:'sobre-nosotros', component: AboutUsComponent},
  {path: 'terminos-y-condiciones', component: PoliticasComponent},
  {path: 'detalles/:id', component: ProductosDetailsComponent},//cambiar por DETALLES
  {path: 'productos', component: PageProductosComponent}
];
