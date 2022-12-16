
//Directiva
import { ImagenDirective } from './../../utils/directivas/imagen.directive';


import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VeterinariasComponent } from './veterinarias/veterinarias.component';
import { CrearusuComponent } from './usuarios/crearusu/crearusu.component';
import { CrearloginComponent } from './usuarios/crearlogin/crearlogin.component';
import { ModclaveComponent } from './usuarios/modclave/modclave.component';
import { ModuserComponent } from './usuarios/moduser/moduser.component';
import { AsignarolComponent } from './usuarios/asignarol/asignarol.component';
import { InfouserComponent } from './usuarios/infouser/infouser.component';
import { CrearvetComponent } from './veterinarias/crearvet/crearvet.component';
import { UbicacionvetComponent } from './veterinarias/ubicacionvet/ubicacionvet.component';
import { AddpervetComponent } from './veterinarias/addpervet/addpervet.component';
import { InfovetComponent } from './veterinarias/infovet/infovet.component';
import { ModvetComponent } from './veterinarias/modvet/modvet.component';
import { MapaComponent } from './veterinarias/mapa/mapa.component';
import { RolesComponent } from './roles/roles.component';
import { AddrolComponent } from './roles/addrol/addrol.component';
import { ModrolComponent } from './roles/modrol/modrol.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { AddprocesoComponent } from './procesos/addproceso/addproceso.component';
import { ModprocesoComponent } from './procesos/modproceso/modproceso.component';
import { AsignarprocesosComponent } from './roles/asignarprocesos/asignarprocesos.component';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { ReportesComponent } from './reportes/reportes.component';




@NgModule({
  declarations: [ImagenDirective,DashboardComponent, InicioComponent, UsuariosComponent, VeterinariasComponent, CrearusuComponent, CrearloginComponent, ModclaveComponent, ModuserComponent, AsignarolComponent, InfouserComponent, CrearvetComponent, UbicacionvetComponent, AddpervetComponent, InfovetComponent, ModvetComponent, MapaComponent, RolesComponent, AddrolComponent, ModrolComponent, ProcesosComponent, AddprocesoComponent, ModprocesoComponent, AsignarprocesosComponent, MiperfilComponent, ReportesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class DashboardModule { }
