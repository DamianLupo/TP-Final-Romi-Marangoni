import { Component, inject } from "@angular/core";
import { ListProductosComponent } from "../../../components/list-productos/list-productos.component";
import { Producto } from "../../../interface/producto.interface";
import { ProductoService } from "../../../service/producto.service";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-page-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-productos.component.html',
  styleUrl: './page-productos.component.css'
})

export class PageProductosComponent {

  ngOnInit(): void {
    this.listarProductos();
  }
  listaProductos: Producto[] = [];

  productoService = inject(ProductoService);

  listarProductos() {
    this.productoService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.listaProductos = productos;
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

ordenarPorPrecio(orden: string) {
  if (orden === 'asc') {
    this.listaProductos.sort((a, b) => a.precio - b.precio);
  } else if (orden === 'desc') {
    this.listaProductos.sort((a, b) => b.precio - a.precio);
  } else {
    this.listarProductos();
  }
}

filtrarPorRangoPrecio(precioMin: number, precioMax: number) {
  if (precioMin >= 0 && precioMax >= precioMin) {
    this.productoService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.listaProductos = productos.filter(producto =>
          producto.precio >= precioMin && producto.precio <= precioMax
        );
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  } else {
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
