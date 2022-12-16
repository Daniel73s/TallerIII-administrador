import { UsuariosService } from './../../../../servicios/usuarios.service';
import { MisValidaciones } from './../../../../utils/misValidaciones';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-modclave',
  templateUrl: './modclave.component.html',
  styleUrls: ['./modclave.component.css']
})
export class ModclaveComponent implements OnInit {

   public usumod='';
   public hide=true;
   public hide2=true;
   formulario:FormGroup;
  constructor(private router:ActivatedRoute,private fb:FormBuilder,private usu:UsuariosService,private route:Router) { 
    this.usumod=this.router.snapshot.paramMap.get('login');
  }

  ngOnInit(): void {
     this.FormInit();
  }

  FormInit(){
    this.formulario=this.fb.group({
            username:[this.usumod,Validators.required],
            clave:['',[Validators.required,Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/),Validators.minLength(8)]],
            repclave:['',[Validators.required,Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]/),Validators.minLength(8)]]
    },{
      validators: MisValidaciones.passwordMatchValidator
    });
  }
 

  submit(){
    this.usu.actualizarClave({
      username:this.formulario.value.username,
      clave:this.formulario.value.clave
    }).then((data)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
          })
      this.route.navigate(['/dashboard/usuarios']);
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
    } else if (this.formulario.get(field).hasError('minlength')) {
      mensaje = 'la clave debe tener como minimo 8 caracteres'
    } else if (this.formulario.get(field).hasError('pattern')) {
        mensaje = 'La contraseña debe tener mayusculas minusculas digitos y caracteres especiales'
    } else if (this.formulario.get(field).hasError('NoPassswordMatch')) {
      mensaje = 'La clave no coincide'
    }else if(this.formulario.get(field).hasError('maxlength')){
       mensaje='solo se permiten 20 caracteres como maximo'
    }
    return mensaje
  }

}
