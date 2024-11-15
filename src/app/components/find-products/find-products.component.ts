import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Producto } from '../../interface/producto.interface';
import { RutinaInterface } from '../../interface/rutina.interface';
import { ProductoService } from '../../service/producto.service';
import { RutinaServiceService } from '../../service/rutina.service.service';

@Component({
  selector: 'app-find-products',
  standalone: true,
  imports: [],
  templateUrl: './find-products.component.html',
  styleUrl: './find-products.component.css'
})
export class FindProductsComponent implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {
    this.stringBuscar=history.state.stringBuscar;
    forkJoin({
      productos: this.productosService.getProductos(),
      rutinas: this.rutinasService.getRutina()
    }).subscribe(({ productos, rutinas }) => {
      this.productos = productos;
      this.rutinas = rutinas;
      this.makeArray(); 
    }); 
  }
  makeArray(){
    console.log(this.stringBuscar);
    this.arrayDeAmbos = [...this.productos, ...this.rutinas].filter(item => 
      item.nombre.toLowerCase().includes(this.stringBuscar.toLowerCase())
    );
  }
  stringBuscar!: string;
  productosService=inject(ProductoService);
  rutinasService=inject(RutinaServiceService);
  productos: Producto[]=[];
  rutinas: RutinaInterface[]=[];
  arrayDeAmbos: (Producto | RutinaInterface)[]=[];
  seeProductDetails(id: string){
    this.router.navigate(['/detalles', id]);
  }
  seeRutinaDetails(id: string){
    this.router.navigate(['/detalles-rutinas', id]);
  }
  isRutina(producto: Producto | RutinaInterface): producto is RutinaInterface {
    let isRutina=false;
    if('urlDescarga' in producto){
      isRutina=true;
    }
    return isRutina;
  }
  ordenarPorPrecio(orden: string) {
    if (orden === 'asc') {
      this.arrayDeAmbos.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'desc') {
      this.arrayDeAmbos.sort((a, b) => b.precio - a.precio);
    } else {
      this.makeArray();
    }
  }
  
  filtrarPorRangoPrecio(precioMin: number, precioMax: number) {
    if (precioMin >= 0 && precioMax >= precioMin) {
      this.arrayDeAmbos = this.arrayDeAmbos.filter(item => 
        item.precio >= precioMin && item.precio <= precioMax
      );
    } else if (precioMin > 0 && precioMax == null) {
          this.arrayDeAmbos = this.arrayDeAmbos.filter(item =>
            item.precio >= precioMin
          );
    } else if (precioMin == null && precioMax > 0) {
          this.arrayDeAmbos = this.arrayDeAmbos.filter(item =>
            item.precio >= 0 && item.precio <= precioMax
          );
    }else {
      this.makeArray();
    }
  }
  verificarCamposVacios(precioMin: number, precioMax: number) {
    this.makeArray();
    if (!precioMin && !precioMax) {
      this.makeArray();
    } else {
      this.filtrarPorRangoPrecio(precioMin, precioMax);
    }
  }
}
