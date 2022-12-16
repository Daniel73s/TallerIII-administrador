import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { MisValidaciones } from './../../../../utils/misValidaciones';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../../../servicios/usuarios.service'
import { RolesService } from '../../../../servicios/roles.service'
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2'
// import {Persona}from '../../../../utils/interfaces/persona.interface'
@Component({
  selector: 'app-crearusu',
  templateUrl: './crearusu.component.html',
  styleUrls: ['./crearusu.component.css']
})
export class CrearusuComponent implements OnInit {
  @ViewChild('ImageUser') fotoUser: ElementRef;
  formulario: FormGroup;
  roles: any;
  regex = '[A-Za-z ]*';
  minDate: Date;
  maxDate: Date;
  usurol = 3;
  urlImage: Observable<string>;
  uploadPercent: Observable<number>;
  public hide = true;
  public hide2 = true;
  private fechacre = new Date();
  constructor(private fb: FormBuilder, private usu: UsuariosService, private _snackBar: MatSnackBar, private route: Router, private rol: RolesService, private storage: AngularFireStorage) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 15, 11, 31);
  }

  ngOnInit(): void {
    this.formInit();
    this.MostrarRoles();
  }

  formInit() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(35), Validators.pattern(this.regex)]],
      ap: ['', [Validators.maxLength(35), Validators.pattern(this.regex)]],
      am: ['', [Validators.maxLength(35), Validators.pattern(this.regex)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      celular: ['', [Validators.required]],
      fechanac: ['', Validators.required],
      clave: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/),Validators.minLength(8)]],
      repclave: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/),Validators.minLength(8)]],
      rol: [this.usurol]
    },
      {
        validators: MisValidaciones.passwordMatchValidator
      }
    );
  }

  MostrarRoles() {
    this.rol.getrolesByestado(true).then(data => {
      this.roles = data
    });
  }

  submit() {
    const valores = this.formulario.value;
    valores.foto = this.fotoUser.nativeElement.value;
    if (valores.foto == '') {
      valores.foto = 'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/fotosPerfil%2Fuser.png?alt=media&token=dd40b091-627f-4fc0-90d3-a433d777d66b';
    }
    this.usu.crearPersona(valores).then((resp) => {
      const codper = resp[0].codper;
      const user = `user${codper}`;
      const clave = this.formulario.value.clave
      return this.usu.crearCuenta({
        "user": user,
        "clave": clave,
        "codper": codper,
        "codrol": this.formulario.value.rol,
        "fechacre": this.fechacre
      })
    }).then((resp2) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: resp2['mensaje'],
        showConfirmButton: false,
        timer: 2000
      })
      this.route.navigate(['/dashboard/usuarios']);
    });
  }


  selectRol(e) {
    this.usurol = e.value;
  }


  uploadFile(event) {
    // console.log('Tiene '+ (event.target.files[0].size/1024)+' Kilobytes')
    if ((event.target.files[0].size / 1024) > 3000) {
      Swal.fire(
        'Error!!!',
        'Imagen demaciado grande ',
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
    } else if (this.formulario.get(field).hasError('minlength')) {
      mensaje = 'la clave debe tener como minimo 8 caracteres'
    } else if (this.formulario.get(field).hasError('pattern')) {
      if(field=='nombre' || field=='ap' || field=='am'){
        mensaje = 'Solo se permiten letras'
      }else{
        mensaje = 'La contraseña debe tener mayusculas minusculas digitos y caracteres especiales'
      }
    } else if (this.formulario.get(field).hasError('NoPassswordMatch')) {
      mensaje = 'La clave no coincide'
    }
    return mensaje
  }
}
