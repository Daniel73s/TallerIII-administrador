import { AbstractControl} from "@angular/forms";
import { map } from "rxjs/operators";
import { UsuariosService } from "../servicios/usuarios.service";

export class MisValidaciones{
   static validarUsuario(usuario:UsuariosService){
       return (control:AbstractControl)=>{
           const value=control.value;
           return usuario.getlogins(value)
                  .pipe(
                      map(response=>{
                        //   console.log(response['length']);
                        return response['length'] == 0 ? null: {mensage:true}
                        // return res ? { shouldBeUnique: true } : null;
                      })
                  );
       }
   }

   static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('clave').value; // get password from our password form control
    const confirmPassword: string = control.get('repclave').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('repclave').setErrors({ NoPassswordMatch: true });
    }
  }
}
