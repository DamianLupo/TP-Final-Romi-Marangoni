import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RutinaInterface } from '../../interface/rutina.interface';
import { RutinaServiceService } from '../../service/rutina.service.service';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [RouterLink],
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
  ordenarPorPrecio(orden: string) {
    if (orden === 'asc') {
      this.listaRutinas.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'desc') {
      this.listaRutinas.sort((a, b) => b.precio - a.precio);
    } else {
      this.listarProductos();
    }
  }
  
  filtrarPorRangoPrecio(precioMin: number, precioMax: number) {
    if (precioMin >= 0 && precioMax >= precioMin) {
      this.productoService.getRutina().subscribe({
        next: (rutinas: RutinaInterface[]) => {
          this.listaRutinas = rutinas.filter(rutina =>
            rutina.precio >= precioMin && rutina.precio <= precioMax
          );
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      });
    } else if (precioMin > 0 && precioMax == null) {
      this.productoService.getRutina().subscribe({
        next: (rutinas: RutinaInterface[]) => {
          this.listaRutinas = rutinas.filter(rutina =>
            rutina.precio >= precioMin
          );
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      });
    } else if (precioMin == null && precioMax > 0) {
      this.productoService.getRutina().subscribe({
        next: (rutinas: RutinaInterface[]) => {
          this.listaRutinas = rutinas.filter(rutina =>
            rutina.precio >= 0 && rutina.precio <= precioMax
          );
        },
        error: (e: Error) => {
          console.log(e.message);
        }
      });
    }else{
      this.listarProductos();
    }
  }
  verificarCamposVacios(precioMin: number, precioMax: number) {
    if (!precioMin && !precioMax) {
      this.listarProductos();
    } else {
      this.filtrarPorRangoPrecio(precioMin, precioMax);
    }
  }

}
