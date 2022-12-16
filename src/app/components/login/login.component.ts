import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form:FormGroup
siteKey:string;
loading:Boolean=false;
hide=true;
  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar,private router:Router,private auth:AuthService) { 
    // this.siteKey="6Lf4lQobAAAAAKX3UvdVP7k627ocF51bFly1eUeq";
    // this.siteKey="6LcinD4dAAAAANQHQCBFtyYxnDSE-LlqQxADlRSR"
    this.siteKey="6Ldrez8dAAAAAH-CkD52gbxzwLW37mXLLf-KrWG_"
    this.form=this.fb.group({
        usuario:['',[Validators.required,Validators.minLength(8)]],
        password:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/)]],//
        recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  ingresar(){
    const username=this.form.value.usuario;
    const clave=this.form.value.password;
    this.auth.singIn({clave,username}).then((data:any)=>{
      localStorage.setItem('token',data.token);
      this.router.navigate(['/dashboard']);
    }).catch(()=>{
      this.mensaje('Usuario o contraseña incorrectos');
    })
  }

  getErrorMessage(field:string):string{
    let Mensaje;
    if(this.form.get(field).errors.required){
        Mensaje="El campo esta vacio"
    }else if(this.form.get(field).hasError('minlength')){
        const minlength=this.form.get(field).errors?.minlength.requiredLength;
        Mensaje= `La contraseña debe tener minimo ${minlength} caracteres`
    }else if(this.form.get(field).hasError('pattern')){
        Mensaje="La contraseña debe tener mayusculas minusculas digitos y caracteres especiales"
    }

    return Mensaje;
  }

   valido(field:string):boolean{
        return(
            (this.form.get(field).touched || this.form.get(field).dirty) &&
            !this.form.get(field).valid
            );
   }

  mensaje(texto:string){
    this._snackBar.open(texto,'',{
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom'

    });
  }

  fakeloading(){
    this.loading=true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
