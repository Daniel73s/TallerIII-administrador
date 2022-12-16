
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { UbicacionService } from './../../../../servicios/ubicacion.service';
import { UbicacionvetComponent } from './../ubicacionvet/ubicacionvet.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VeterinariasService } from './../../../../servicios/veterinarias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { CategoriasService } from 'src/app/servicios/categorias.service';
@Component({
  selector: 'app-modvet',
  templateUrl: './modvet.component.html',
  styleUrls: ['./modvet.component.css']
})
export class ModvetComponent implements OnInit {
veterinaria:any;
codvet:number
formulario:FormGroup;
foto:string;
ubicacion:any={};
uploadPercent:Observable<number>;
urlImage:Observable<string>;
private currentYear = new Date();
public categorias:any[]=[];
@ViewChild('Imagevet') fotovet:ElementRef;
  constructor(  
      private route:ActivatedRoute,
      private vet:VeterinariasService,
      private fb:FormBuilder,
      public dialog: MatDialog,
      public serUb:UbicacionService,
      private storage: AngularFireStorage,
      private router:Router,
      public _categorias:CategoriasService) 
      { 
        this.codvet=Number(this.route.snapshot.paramMap.get('codvet'));
      }

  ngOnInit(): void {
    this.formInit();
    this.serUb.getubicacion().subscribe(data=>{
      this.ubicacion.lat=data.lat;
      this.ubicacion.lng=data.lng;
    });   
    this.getcategorias();
  }



  async formInit(){
    this.veterinaria = await this.vet.getInfoVetById(this.codvet);  
    this.foto=this.veterinaria[0].imagen;
    this.ubicacion.lat=this.veterinaria[0].lat;
    this.ubicacion.lng=this.veterinaria[0].lng;

    
    this.formulario=this.fb.group({
        nombre:[this.veterinaria[0].nombre,[Validators.maxLength(30), Validators.required]],
        telefono:[this.veterinaria[0].telefono,[Validators.required, Validators.pattern(/^([0-9])*$/),Validators.maxLength(8),Validators.minLength(8)]],
        direccion:[this.veterinaria[0].direccion,[Validators.maxLength(150), Validators.required]],
        descripcion:[this.veterinaria[0].descripcion,[Validators.required, Validators.maxLength(250)]],
        categoria:[this.veterinaria[0].codcategoria,[Validators.required]]
    });

  }

  getcategorias(){
    this._categorias.getcategorias().then((data:any)=>{
      this.categorias=data;
   })
  }
update(){
    const valores=this.formulario.value;
    valores.lat=String(this.ubicacion.lat);
    valores.lng=String(this.ubicacion.lng);
    valores.fechamod=this.currentYear;
    valores.imagen=this.fotovet.nativeElement.value;
    if(valores.imagen==''){
      valores.imagen=this.foto;  
     }   

     
    this.vet.updateVet(this.codvet,valores).then(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
         })
      this.router.navigate(['/dashboard/veterinarias']);
    }).catch(()=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    })
}

uploadFile(event) {
if((event.target.files[0].size/1024)>3000){
Swal.fire(
  'Error!!!',
  'Imagen Muy grande Redusca el tamaño',
  'error'
)
}else{
const id= Math.random().toString(36).substring(2);
const file = event.target.files[0];
const filePath = `/veterinarias/img_${id}`;
const ref=this.storage.ref(filePath);
const task = this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe(finalize(()=>
         this.urlImage=ref.getDownloadURL()
)).subscribe();
}
}
openDialog() {
  const dialogRef = this.dialog.open(UbicacionvetComponent,{width:'100%',height:'90%'});
 }

  Horario(horainiM:string,horafinM:string,horainiT:string,horafinT:string){
   const horaAtencion=`HORARIO EN LA MAÑARA DE ${horainiM} HASTA ${horafinM} Y EN LA TARDE DESDE LAS ${ horainiT} HASTA LAS ${horafinT}`;
   return horaAtencion
  }

  getError(field: string): string {
    let mensaje;
    if (this.formulario.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formulario.get(field).hasError('maxlength')) {
      if (field == 'nombre') {
        mensaje = 'solo se permiten 30 caracteres como maximo'
      } else if (field == 'direccion') {
        mensaje = 'solo se permiten 150 caracteres'
      } else if (field == 'descripcion') {
        mensaje = 'solo se permiten 250 caracteres'
      }else if(field=='telefono'){
        mensaje = 'solo se permiten 8 digitos'
      }
    } else if (this.formulario.get(field).hasError('minlength')) {
      mensaje = 'faltan digitos'
    } else if (this.formulario.get(field).hasError('pattern')) {
      mensaje = 'numero no valido'
    }
    return mensaje
  }
}
