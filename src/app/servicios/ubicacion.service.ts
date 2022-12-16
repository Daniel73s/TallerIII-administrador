import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
// @Output() ubicacion: EventEmitter<any> = new EventEmitter();

private ubicacion$:Subject<any>;
private ubicacion:any={};
  constructor() { 
    this.ubicacion$=new Subject();
  }

  setUbicacion(lat,lng){
         this.ubicacion.lat=lat
         this.ubicacion.lng=lng
         this.ubicacion$.next(this.ubicacion);
  }

  getubicacion():Observable<any>{
    return this.ubicacion$.asObservable();
  }
}
