
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appImagen]'
})
export class ImagenDirective implements OnInit {
@Input() urlCustom:string;
  constructor(private elementref:ElementRef) { }

  ngOnInit(){
    const img = this.elementref.nativeElement;
    // console.log(img);
  }

  @HostListener('error')
  cargarImagenporDefecto(){
    // console.log('esta imagen esta rota',this.elementref.nativeElement);
    const element=this.elementref.nativeElement;
    element.src=this.urlCustom || './assets/img/img-rota.png';
    
  }
}
