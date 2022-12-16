import { Observable } from 'rxjs';

import { UsuariosService } from './../../../servicios/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2'
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
   formu:boolean=false;
   formularioUpdate:FormGroup;
   codper:number;
   persona:any;
   minDate:Date;
   maxDate:Date;
   uploadPercent:Observable<number>;
   urlImage:Observable<string>;
   @ViewChild('ImageUser') fotoUser:ElementRef;
  constructor(private route:ActivatedRoute,private snack:MatSnackBar,private fb:FormBuilder,private usu:UsuariosService,private router:Router,private storage: AngularFireStorage) {
    this.codper=Number(this.route.snapshot.paramMap.get('codper'));
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 15, 11, 31);
   }

  ngOnInit(): void {
    this.getInfo();
    this.FormInit();

  }

  async FormInit(){
    const per= await this.usu.getUsuario(this.codper);
    this.formularioUpdate=this.fb.group({
           nombre:[per[0].nombre,Validators.required],
           ap:[per[0].ap,Validators.required],
           am:[per[0].am,Validators.required],
           direccion:[per[0].direccion,Validators.required],
           celular:[per[0].celular,Validators.required],
           fechanac:[per[0].fechanac,Validators.required]
    });
  }

  uploadFile(event) {
    // console.log('Tiene '+ (event.target.files[0].size/1024)+' Kilobytes')
if((event.target.files[0].size/1024)>3000){
  Swal.fire(
    'Error!!!',
    'Imagen demaciado grande ',
    'error'
  )
}else{
  const id= Math.random().toString(36).substring(2);
  const file = event.target.files[0];
  const filePath = `/fotosPerfil/Perfil_${id}`;
  const ref=this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(finalize(()=>
           this.urlImage=ref.getDownloadURL()
  )).subscribe();
}
  }


  getInfo(){
    this.usu.imprimirDatosPersona(this.codper).then((data:any[])=>{
      this.persona=data[0];            
    })
  }
  removerdata(){
    this.mensaje('listo para editar');
    this.formu=true;
  }

  mensaje(texto:string){
        this.snack.open(texto,'',{
          duration:3000,
          horizontalPosition:'center',
          verticalPosition:'top'
        })
  }
  cancelar(){
    this.formu=false;
  }

  actualizar(){
    // console.log(this.formularioUpdate.value);
    Swal.fire({
      title: 'Atencion!!!',
      text: "Para guardar los datos correctamente , la sesion se cerrara automaticamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: ' #e7e7e7 ',
      confirmButtonText: 'Aceptar!'
    }).then((result) => {
      if (result.isConfirmed) {
        let valores=this.formularioUpdate.value;
        valores.foto=this.fotoUser.nativeElement.value;   
        if(valores.foto==''){
          valores.foto=this.persona.foto
        }

         this.usu.modPersona(valores,this.codper).then(()=>{
          this.mensaje('Se Actualizo Correctamente');
            this.logout();
      }).catch(()=>{
        Swal.fire(
          'Error!!!',
          'Ocurrio un error inesperado intentelo nuevamente',
          'error'
        )
      });
         
      }
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
