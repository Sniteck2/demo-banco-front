import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CrearUsuarioComponent} from "../crear-usuario/crear-usuario.component";

const routes: Routes = [
  {path: 'crear-usuario', component: CrearUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginUsuarioRoutingModule {
}
