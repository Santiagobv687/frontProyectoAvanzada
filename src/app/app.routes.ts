import { Routes } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import {AdminComponent} from './Componentes/admin/admin.component';
import {UsuarioComponent} from './Componentes/usuario/usuario.component';
import {CrearReporteComponent} from './Componentes/Reporte/crearReporte.component';


export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'usuario',component:UsuarioComponent},
  { path: 'crearReporte',component:CrearReporteComponent},
  { path: 'revisarReportes',component:CrearReporteComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
