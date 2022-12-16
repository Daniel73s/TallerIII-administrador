import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from './../../../../servicios/usuarios.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-moduser',
  templateUrl: './moduser.component.html',
  styleUrls: ['./moduser.component.css']
})
export class ModuserComponent implements OnInit {
  @ViewChild('ImageUser') fotoUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  formulario: FormGroup;
  codper;
  persona;
  foto;
  minDate: Date;
  maxDate: Date;
  regex = '[A-Za-z ]*';
  constructor(private router: ActivatedRoute, private usu: UsuariosService, private snack: MatSnackBar, private fb: FormBuilder, private route: Router, private storage: AngularFireStorage) {
    this.codper = Number(this.router.snapshot.paramMap.get('codper'));
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 15, 11, 31);
  }

  ngOnInit(): void {
    this.formInit();
  }

  async formInit() {
    this.persona = await this.usu.getUsuario(this.codper);
    this.foto = this.persona[0].foto;
    this.formulario = this.fb.group({
      nombre: [this.persona[0].nombre, [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      ap: [this.persona[0].ap, [Validators.maxLength(35), Validators.pattern(this.regex)]],
      am: [this.persona[0].am, [Validators.maxLength(35), Validators.pattern(this.regex)]],
      celular: [this.persona[0].celular, [Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(8), Validators.minLength(8)]],
      direccion: [this.persona[0].direccion, [Validators.required, Validators.maxLength(150)]],
      fechanac: [this.persona[0].fechanac, [Validators.required]]
    });
  }



  modificar() {
    const valores = this.formulario.value;
    valores.foto = this.fotoUser.nativeElement.value;
    if (valores.foto == '') {
      valores.foto = this.foto;
    }
    // console.log(valores);
    this.usu.modPersona(valores, this.persona[0].codper).then((data) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
      })
      this.route.navigate(['/dashboard/usuarios']);
    }).catch(() => {
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    });
  }


  uploadFile(event) {
    if ((event.target.files[0].size / 1024) > 3000) {

      Swal.fire(
        'Error!!!',
        'Imagen Muy grande Redusca el tamaño',
        'error'
      )
    } else {
      const id = Math.random().toString(36).substring(2);
      const file = event.target.files[0];
      const filePath = `/fotosPerfil/Perfil_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() =>
        this.urlImage = ref.getDownloadURL()
      )).subscribe();
    }
  }

  getError(field: string): string {
    let mensaje;
    if (this.formulario.get(field).hasError('required')) {
      mensaje = 'campo requerido';
    } else if (this.formulario.get(field).hasError('maxlength')) {
      if (field == 'celular') {
        mensaje = 'solo se permiten 8 digitos'
      } else if (field == 'nombre' || field == 'ap' || field == 'am') {
        mensaje = 'Se paso del numero de caracteres permitidos'
      } else if (field == 'direccion') {
        mensaje = 'solo se permiten 150 caracteres'
      }

    } else if (this.formulario.get(field).hasError('pattern')) {
      if (field == 'celular') {
        mensaje = 'solo se aceptan digitos'
      } else if (field == 'nombre') {
        mensaje = 'Solo se aceptan letras'
      }
    } else if (this.formulario.get(field).hasError('minlength')) {
      mensaje = 'numero debe tener 8 digitos'
    }
    return mensaje
  }

}
