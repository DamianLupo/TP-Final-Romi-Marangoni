import { ClusterMessage } from './../../../node_modules/socket.io-adapter/dist/cluster-adapter.d';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutinaInterface } from '../interface/rutina.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaServiceService {

  constructor(private http : HttpClient) { }
  rutinas : RutinaInterface[]=[]

  urlBase : string = "http://localhost:5000/rutinas";

  getRutina():Observable<RutinaInterface[]>{
    return this.http.get<RutinaInterface[]>(this.urlBase).pipe(tap((data)=>{
      this.rutinas=data;
    }));
  }

  postRutina(rutina: RutinaInterface):Observable<RutinaInterface>{
    return this.http.post<RutinaInterface>(this.urlBase, rutina);
  }

  deleteRutina(id: number):Observable<RutinaInterface>{
    return this.http.delete<RutinaInterface>(`${this.urlBase}/${id}`);
  }
  getRutinaid(id: string | null):Observable<RutinaInterface>{
    return this.http.get<RutinaInterface>(`${this.urlBase}/${id}`);
  }
  setID() : string {
    if (this.rutinas.length === 0) {
      return "1";
    }
    return (Number(this.rutinas[this.rutinas.length-1].id) + 1).toString();
  }
  putRutina(rutina: RutinaInterface, id: number):Observable<RutinaInterface>{
    return this.http.put<RutinaInterface>(`${this.urlBase}/${id}`, rutina);
  }
}
