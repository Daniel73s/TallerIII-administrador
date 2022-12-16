import { Router } from '@angular/router';
import { ProcesosService } from './../../../../servicios/procesos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-addproceso',
  templateUrl: './addproceso.component.html',
  styleUrls: ['./addproceso.component.css']
})
export class AddprocesoComponent implements OnInit {
  public formulario:FormGroup;
  private regex="[A-Za-z ]*";
  constructor(private fb:FormBuilder,private prs:ProcesosService,private router:Router) { }

  ngOnInit(): void {
    this.formInit();

  }

  paginaicono(){
    window.open('https://fonts.google.com/icons');
  }

  formInit(){
    this.formulario=this.fb.group({
        nombre:['',[Validators.required,Validators.maxLength(30),Validators.pattern(this.regex)]],
        enlace:['',[Validators.required,Validators.maxLength(100),Validators.pattern(this.regex)]],
        icono:['',[Validators.required, Validators.maxLength(50)]] 
    });
  }

  guardar(){

    this.prs.addproceso(this.formulario.value).then(data=>{
        //  this.mensaje(data['mensaje']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data['mensaje'],
          showConfirmButton: false,
          timer: 2000
        })
         this.router.navigate(['/dashboard/procesos']);
    }).catch(e=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    })
  }

  getError(field: string): string {
    let mensaje;
    if (this.formulario.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formulario.get(field).hasError('maxlength')){
      if(field=='nombre'){
        mensaje="el nombre debe tener como maximo 30 caracteres"
      }else if (field=='enlace'){
        mensaje="el enlace como maximo debe tener 100 caracteres"
      }else if(field=='icono'){
        mensaje="el icono debe tener como maximo 50 caracteres"
      }

    }else if (this.formulario.get(field).hasError('pattern')){
      mensaje="el campo no debe contener numeros "
    }
    return mensaje
  }


}
