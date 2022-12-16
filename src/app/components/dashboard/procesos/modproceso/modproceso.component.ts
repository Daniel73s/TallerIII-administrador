import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { procesoInterface } from './../../../../utils/interfaces/proceso.interface';
import { ProcesosService } from './../../../../servicios/procesos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-modproceso',
  templateUrl: './modproceso.component.html',
  styleUrls: ['./modproceso.component.css']
})
export class ModprocesoComponent implements OnInit {
  private codproc:number;
  public formulario:FormGroup;
  public bandera:boolean=false;
  private regex="[A-Za-z ]*";
  constructor(private route:ActivatedRoute,private prs:ProcesosService,private fb:FormBuilder,private router:Router) { 
        this.codproc=Number(this.route.snapshot.paramMap.get('codproc'));        
  }

  ngOnInit(): void {

    this.formInit();
  }
async formInit(){
  const proceso:procesoInterface=await this.prs.getProcesoById(this.codproc);
  this.formulario=this.fb.group({
    nombre:[proceso.nombre,[Validators.required,Validators.maxLength(30),Validators.pattern(this.regex)]],
    enlace:[proceso.enlace,[Validators.required,Validators.maxLength(100)]],
    icono:[proceso.icono,[Validators.required, Validators.maxLength(50)]]
  })
  this.bandera=true;
  }

  paginaicono(){
    window.open('https://fonts.google.com/icons');
  }

  actualizar(){
    this.formulario.value.codproc=this.codproc;
    this.prs.updateproceso(this.formulario.value).then(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
        })
        this.router.navigate(['/dashboard/procesos']);
    }).catch(()=>{
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
