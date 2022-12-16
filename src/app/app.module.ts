import { SharedModule } from './components/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule}from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
//Angular material

//Componentes
import { LoginComponent } from './components/login/login.component';
//Captchat
import { NgxCaptchaModule } from 'ngx-captcha';
import { CompartirComponent } from './components/compartir/compartir.component';
import { ServiceWorkerModule } from '@angular/service-worker';
//Directivas
// import { ImagenDirective } from './utils/directivas/imagen.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompartirComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
