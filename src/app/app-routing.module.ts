import { CompartirComponent } from './components/compartir/compartir.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent,canActivate:[LoginGuard]},
  {path:'compartir/:codvet',component:CompartirComponent},
  {path:'dashboard',canActivate:[AuthGuard],loadChildren: ()=> import('./components/dashboard/dashboard.module').then(x =>x.DashboardModule)}, //,canActivate:[AuthGuard]
  {path:'**',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
