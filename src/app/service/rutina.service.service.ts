import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutinaInterface } from '../interface/rutina.interface';

@Injectable({
  providedIn: 'root'
})
export class RutinaServiceService {

  constructor(private http : HttpClient) { }

  urlBase : string = "http://localhost:5000/rutinas";

  getRutina():Observable<RutinaInterface[]>{
    return this.http.get<RutinaInterface[]>(this.urlBase);
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
}
