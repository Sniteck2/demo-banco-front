import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CrearUsuarioComponent} from "./pages/crear-usuario/crear-usuario.component";
import {LoginUsuarioComponent} from "./pages/login-usuario/login-usuario.component";
import {MenuPrincipalComponent} from "./pages/menu-principal/menu-principal.component";


const routes: Routes = [
  {path: '', redirectTo: '/login-usuario', pathMatch: 'full'},
  {path: 'login-usuario', component: LoginUsuarioComponent},
  {path: 'crear-usuario', component: CrearUsuarioComponent},
  {path: 'menu-principal', component: MenuPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
