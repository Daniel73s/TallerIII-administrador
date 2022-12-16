import { CategoriasService } from './../../../servicios/categorias.service';
import { VeterinariasService } from './../../../servicios/veterinarias.service';
import { GeneratexlsxService } from './../../../servicios/generatexlsx.service';
import { UsuariosService } from './../../../servicios/usuarios.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public colSize: number = 3;
  public colSizevet: number = 2;
  public isMobile: boolean = false;
  public SizeBoton: number = 3;
  public categorias:any[]=[];
  public meses: any[] = [
    { nombre: "Sin Fecha", codigo:13 },
    { nombre: "Enero", codigo: 1 },
    { nombre: "Febrero", codigo: 2 },
    { nombre: "Marzo", codigo: 3 },
    { nombre: "Abril", codigo: 4 },
    { nombre: "Mayo", codigo: 5 },
    { nombre: "Junio", codigo: 6 },
    { nombre: "Julio", codigo: 7 },
    { nombre: "Agosto", codigo: 8 },
    { nombre: "Septiembre", codigo: 9 },
    { nombre: "Octubre", codigo: 10 },
    { nombre: "Noviembre", codigo: 11 },
    { nombre: "Diciembre", codigo: 12 }
  ];
  public consulta: any = {
    estado: "",
    rol: "",
    mes: ""
  };


public consultaVet: any = {
    estado: "",
    mes: "",
    codcategoria:""
};


  constructor(breapoint: BreakpointObserver,
              private userService:UsuariosService,
              private excel:GeneratexlsxService,
              private vetService:VeterinariasService,
              private _categoriasService:CategoriasService) {
    breapoint.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.colSize = 1;
        this.colSizevet=1;
      } else {
        this.colSize = 3;
        this.colSizevet=2;
      }
    })
  }

  ngOnInit(): void {
        this._categoriasService.getcategorias().then((data:any[])=>{
              this.categorias=data;
        });
  }

  generarReporteUsuarios() {
    console.log();
    this.userService.getReporteUsuarios(this.consulta).then((data:any[])=>{
   
      if(data.length==0){
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'No se encontro Registro para la busqueda',
          showConfirmButton: false,
          timer: 2000
        })
      }else{

        this.excel.exportToExcel(data,'Reporte_Usuarios');
      }
    }).catch(e=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se genero un error inesperado intentelo nuevamente',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }


  generarReporteVeterinarias(){

    console.log(this.consultaVet);
    
    this.vetService.reporteVeterinarias(this.consultaVet).then((data:any[])=>{
     console.log(data);
     

      if(data.length==0){
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'No se encontro Registro para la busqueda',
          showConfirmButton: false,
          timer: 2000
        })
      }else{

        this.excel.exportToExcel(data,'Reporte_Veterinarias');
      }
    }).catch(e=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se genero un error inesperado intentelo nuevamente',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

}
