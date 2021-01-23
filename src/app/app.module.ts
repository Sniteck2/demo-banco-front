import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginUsuarioComponent } from './pages/login-usuario/login-usuario.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginUsuarioRoutingModule} from './pages/login-usuario/login-usuario-routing.module';
import { Ng2Rut } from 'ng2-rut';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { DataTablesModule } from 'angular-datatables';
import {NgSelectModule} from '@ng-select/ng-select';
import { FuncionalidadComponent } from './pages/funcionalidad/funcionalidad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    CrearUsuarioComponent,
    MenuPrincipalComponent,
    FuncionalidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginUsuarioRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Ng2Rut,
    DataTablesModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
