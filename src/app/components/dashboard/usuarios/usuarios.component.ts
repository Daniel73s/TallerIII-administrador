import { RolesService } from './../../../servicios/roles.service';
import { Router } from '@angular/router';
import { UsuariosService } from './../../../servicios/usuarios.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrearusuComponent } from './crearusu/crearusu.component';
import Swal from 'sweetalert2'
import decode from 'jwt-decode';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //Haciendo referencia al componente con alias #buscador
  @ViewChild('buscador') buscar: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  bander: boolean = false;
  bandera: Boolean = true;
  displayedColumns: string[] = ['nombre', 'direccion', 'celular', 'rol', 'estado', 'Acciones'];
  dataSource = new MatTableDataSource();
  public login: any = '';
  private codper = '';
  public roles: any = [];
  constructor(public dialog: MatDialog, private renderer2: Renderer2, private usu: UsuariosService, private router: Router, private rolservice: RolesService) {
    this.login = decode(localStorage.getItem('token'));
    this.codper = this.login.codper;
  }
  ngOnInit(): void {
    this.getRoles();
    this.getUsuarios();
  }
  getUsuarios() {
    this.usu.getUsuarios().subscribe((resp: any) => {

      this.dataSource.data = this.removeUsuarioLogado(resp, Number(this.codper));
      this.bandera = false;
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    this.dialog.open(CrearusuComponent);
  }

  buscarPersona(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiar(): void {
    const buscador = this.buscar.nativeElement;
    this.bandera = !this.bandera;
    if (this.bandera) {
      this.renderer2.setStyle(buscador, 'display', 'inline');
    } else {
      this.renderer2.setStyle(buscador, 'display', 'none');
    }
  }

  getCuenta(login) {
    this.router.navigate([`/dashboard/modclave/${login}`]);
  }
  CambiarRol(rol: any, login: any) {
    this.router.navigate([`/dashboard/asignarol/${rol}/${login}`]);
  }
  moduser(codper: number) {
    this.router.navigate([`/dashboard/moduser/${codper}`]);
  }

  imprimir(codper: number) {
    this.router.navigate([`/dashboard/infouser/${codper}`]);
  }
  estadoUsuario(login: string, estado: boolean) {
    if (estado) {
      Swal.fire({
        title: 'Habilitar Usuario?',
        text: "Este usuario Se habilitara para el ingreso a su cuenta!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008f39',
        cancelButtonColor: ' #e7e7e7 ',
        confirmButtonText: 'Aceptar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usu.cambiarEstadoUsuario({ login, estado }).then(data => {
            Swal.fire(
              'Usuario Habilitado!',
              'Se Habilito satisfactoriamente al Usuario.',
              'success'
            )
            this.getUsuarios();
          }).catch(e => {
            Swal.fire(
              'Error!!!',
              'Ocurrio un error inesperado intentelo nuevamente',
              'error'
            )
          })
        }
      });
    } else {
      Swal.fire({
        title: 'Deshabilitar Usuario?',
        text: "Este usuario Se Deshabilitara para no tener ingreso a su cuenta!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: ' #e7e7e7 ',
        confirmButtonText: 'Aceptar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usu.cambiarEstadoUsuario({ login, estado }).then(data => {
            Swal.fire(
              'Usuario Deshabilitado!!',
              'Se Deshabilito satisfactoriamente al Usuario.',
              'success'
            )
            this.getUsuarios();
          }).catch(e => {
            Swal.fire(
              'Error!!!',
              'Ocurrio un error inesperado intentelo nuevamente',
              'error'
            )
          })
        }
      });
    }
  }

  /*Get Roles*/

  getRoles() {
    this.rolservice.getroles().subscribe(data => {
      this.roles = data;
    })
  }

  removeUsuarioLogado(inArray: any, codper: number) {
    var arr = inArray// create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for (var i = 0; i < arr.length; ++i) {
      //if the two elements are equal , then they are duplicate
      if (arr[i].codper === codper) {
        arr.splice(i, 1); //remove the duplicated element 
      }
    }
    return arr;
  }
}

