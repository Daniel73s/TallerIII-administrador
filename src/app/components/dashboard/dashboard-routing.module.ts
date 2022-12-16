import { ReportesComponent } from './reportes/reportes.component';
import { MiperfilComponent } from './miperfil/miperfil.component';

import { AsignarprocesosComponent } from './roles/asignarprocesos/asignarprocesos.component';
import { ModprocesoComponent } from './procesos/modproceso/modproceso.component';
import { AddprocesoComponent } from './procesos/addproceso/addproceso.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { ModrolComponent } from './roles/modrol/modrol.component';
import { AddrolComponent } from './roles/addrol/addrol.component';
import { RolesComponent } from './roles/roles.component';
import { MapaComponent } from './veterinarias/mapa/mapa.component';
import { ModvetComponent } from './veterinarias/modvet/modvet.component';
import { InfovetComponent } from './veterinarias/infovet/infovet.component';
import { AddpervetComponent } from './veterinarias/addpervet/addpervet.component';
import { RoleGuard } from './../../guards/role.guard';
import { UbicacionvetComponent } from './veterinarias/ubicacionvet/ubicacionvet.component';
import { CrearvetComponent } from './veterinarias/crearvet/crearvet.component';
import { InfouserComponent } from './usuarios/infouser/infouser.component';
import { AsignarolComponent } from './usuarios/asignarol/asignarol.component';
import { ModuserComponent } from './usuarios/moduser/moduser.component';
import { ModclaveComponent } from './usuarios/modclave/modclave.component';
import { CrearloginComponent } from './usuarios/crearlogin/crearlogin.component';
import { VeterinariasComponent } from './veterinarias/veterinarias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearusuComponent } from './usuarios/crearusu/crearusu.component';


const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'',component:InicioComponent},
    {path:'usuarios',component:UsuariosComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'veterinarias',component:VeterinariasComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'crearusu',component:CrearusuComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'crearlogin',component:CrearloginComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'modclave/:login',component:ModclaveComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'moduser/:codper',component:ModuserComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'asignarol/:rol/:login',component:AsignarolComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'infouser/:codper',component:InfouserComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'crearvet',component:CrearvetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'ubicacionvet',component:UbicacionvetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'addpervet/:codvet',component:AddpervetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'infovet/:codvet',component:InfovetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'modvet/:codvet',component:ModvetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'mapa/:codvet',component:MapaComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'roles',component:RolesComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'addrol',component:AddrolComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'modrol/:codrol',component:ModrolComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'procesos',component:ProcesosComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'addproceso',component:AddprocesoComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'modproceso/:codproc',component:ModprocesoComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'asignarprocesos/:codrol',component:AsignarprocesosComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
    {path:'miperfil/:codper',component:MiperfilComponent},
    {path:'reportes',component:ReportesComponent,canActivate:[RoleGuard],data:{expectedRole:1}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
 
 }





//  const routes: Routes = [
//   {path:'',component:DashboardComponent,children:[
//     {path:'',component:InicioComponent},
//     {path:'usuarios',component:UsuariosComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'veterinarias',component:VeterinariasComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'crearusu',component:CrearusuComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'crearlogin',component:CrearloginComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'modclave/:login',component:ModclaveComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'moduser/:codper',component:ModuserComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'asignarol/:rol/:login',component:AsignarolComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'infouser/:codper',component:InfouserComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'crearvet',component:CrearvetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'ubicacionvet',component:UbicacionvetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'addpervet/:codvet',component:AddpervetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'infovet/:codvet',component:InfovetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'modvet/:codvet',component:ModvetComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'mapa/:codvet',component:MapaComponent},
//     {path:'roles',component:RolesComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'addrol',component:AddrolComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'modrol/:codrol',component:ModrolComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'procesos',component:ProcesosComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'addproceso',component:AddprocesoComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'modproceso/:codproc',component:ModprocesoComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'asignarprocesos/:codrol',component:AsignarprocesosComponent,canActivate:[RoleGuard],data:{expectedRole:1}},
//     {path:'miperfil/:codper',component:MiperfilComponent}
//   ]}
// ];