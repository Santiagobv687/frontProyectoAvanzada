import { Routes } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import {AdminComponent} from './Componentes/admin/admin.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import {AdminPerfilComponent} from './Componentes/admin-perfil/admin-perfil.component';
import {AuthGuard} from './guards/auth.guard';
export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard]},
  { path: 'adminPerfil', component: AdminPerfilComponent,  canActivate: [AuthGuard]},
  { path: 'usuario',component:UsuarioComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];
