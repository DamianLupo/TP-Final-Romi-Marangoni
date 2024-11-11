import { Component, inject } from '@angular/core';
import { RutinaInterface } from '../../interface/rutina.interface';
import { RutinaServiceService } from '../../service/rutina.service.service';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.css'
})
export class RutinasComponent {
  ngOnInit(): void{
    this.listarProductos();
  }
  listaRutinas: RutinaInterface[] = [];

  productoService = inject(RutinaServiceService);

  listarProductos(){
    this.productoService.getRutina().subscribe({
      next: (rutina : RutinaInterface[]) =>{
        this.listaRutinas = rutina;
      },
      error: (e : Error) =>{
        console.log(e.message);
      }
    })
  }

}
