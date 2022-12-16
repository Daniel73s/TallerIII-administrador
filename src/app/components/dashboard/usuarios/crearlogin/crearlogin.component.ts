import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../../../servicios/usuarios.service';
import {MisValidaciones} from '../../../../utils/misValidaciones';
@Component({
  selector: 'app-crearlogin',
  templateUrl: './crearlogin.component.html',
  styleUrls: ['./crearlogin.component.css']
})
export class CrearloginComponent implements OnInit {

  formulario:FormGroup;
  constructor(private fb:FormBuilder,private usu:UsuariosService) { }

  ngOnInit(): void {
    this.formInit();
    // this.usu.getlogins('Daniel123').subscribe(resp =>{
    //   console.log(resp);
      
    // })
  }

  formInit(){
    this.formulario=this.fb.group({
        usuario:['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)],MisValidaciones.validarUsuario(this.usu)],
        clave:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
        repclave:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
    });
  }

  getError(field:string):string{
    let mensaje;
    if (this.formulario.get(field).hasError('required')){
        mensaje='campo requerido';
    }else if(this.formulario.get(field).hasError('minlength')){
      mensaje='minimo debe tener 8 caracteres ';
    }else if(this.formulario.get(field).hasError('maxlength')){
      mensaje='maximo debe tener 15 caracteres ';
    }
    return mensaje
  }
// isvalidfield(field:string):boolean{
//    return ((this.formulario.get(field).touched || this.formulario.get(field).dirty) && !this.formulario.get(field).valid);
//   }
}


