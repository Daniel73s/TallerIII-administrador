import { Router } from '@angular/router';
import { VeterinariasService } from './../../../../servicios/veterinarias.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UbicacionvetComponent } from '../ubicacionvet/ubicacionvet.component';
import { UbicacionService } from '../../../../servicios/ubicacion.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { CategoriasService } from 'src/app/servicios/categorias.service';
@Component({
  selector: 'app-crearvet',
  templateUrl: './crearvet.component.html',
  styleUrls: ['./crearvet.component.css']
})
export class CrearvetComponent implements OnInit {
  public ubicacion: any = {}
  formvet: FormGroup;
  urlImage: Observable<string>;
  uploadPercent: Observable<number>;
  private currentYear = new Date();
  public categorias:any[]=[];
  @ViewChild('ImageUser') fotoUser: ElementRef;
  constructor(public dialog: MatDialog,
    public serUb: UbicacionService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private vet: VeterinariasService,
    private router: Router,
    public _categorias:CategoriasService) {

  }

  ngOnInit() {
    this.serUb.getubicacion().subscribe(data => {
      this.ubicacion.lat = data.lat;
      this.ubicacion.lng = data.lng;
    });
    this.formulario();
    this._categorias.getcategorias().then((data:any)=>{
       this.categorias=data;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UbicacionvetComponent, { width: '100%', height: '90%' });
  }

  formulario() {
    this.formvet = this.fb.group({
      nombre: ['', [Validators.maxLength(30), Validators.required]],
      direccion: ['', [Validators.maxLength(150), Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^([0-9])*$/),Validators.maxLength(8),Validators.minLength(8)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      categoria:['',[Validators.required]]
    });
  }
  uploadFile(event) {

    // console.log('Tiene '+ (event.target.files[0].size/1024)+' Kilobytes')
    if ((event.target.files[0].size / 1024) > 3000) {
      Swal.fire(
        'Error!!!',
        'Imagen Muy grande Redusca el tamaño',
        'error'
      )
    } else {
      const id = Math.random().toString(36).substring(2);
      const file = event.target.files[0];
      const filePath = `/veterinarias/img_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() =>
        this.urlImage = ref.getDownloadURL()
      )).subscribe();
    }
  }


  mensaje(texto: string) {
    this._snackBar.open(texto, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  submit() {
    const valores = this.formvet.value;
    valores.foto = this.fotoUser.nativeElement.value;
    if (valores.foto == '') {
      valores.foto = 'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/veterinarias%2Ficono-veterinaria.png?alt=media&token=e1da06c8-2d28-4416-b09b-286565fbf658';
    }
    valores.lat = String(this.ubicacion.lat);
    valores.lng = String(this.ubicacion.lng);
    valores.fechacre = this.currentYear;

    console.log(valores);
    

    this.vet.addveterinaria(valores).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'se adiciono satisfactoriamente',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/dashboard/veterinarias']);
    }).catch(() => {
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    })
  
  }


  getError(field: string): string {
    let mensaje;
    if (this.formvet.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formvet.get(field).hasError('maxlength')) {
      if (field == 'nombre') {
        mensaje = 'solo se permiten 30 caracteres como maximo'
      } else if (field == 'direccion') {
        mensaje = 'solo se permiten 150 caracteres'
      } else if (field == 'descripcion') {
        mensaje = 'solo se permiten 250 caracteres'
      }else if(field=='telefono'){
        mensaje = 'solo se permiten 8 digitos'
      }
    } else if (this.formvet.get(field).hasError('minlength')) {
      mensaje = 'faltan digitos'
    } else if (this.formvet.get(field).hasError('pattern')) {
      mensaje = 'numero no valido'
    }
    return mensaje
  }
}
