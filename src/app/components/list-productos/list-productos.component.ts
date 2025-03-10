import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../../interface/producto.interface';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent {
  @Input() isHome: boolean = false;

  ngOnInit(): void{
    this.listarProductos();
  }
  listaProductos : Producto[] = [];

  productoService = inject(ProductoService);

  agregarProducto(producto: Producto){
    this.listaProductos.push(producto);
  }

  listarProductos(){
    this.productoService.getProductos().subscribe({
      next: (productos : Producto[]) =>{
        this.listaProductos = productos;
      },
      error: (e : Error) =>{
        console.log(e.message);
      }
    })
  }

  eliminarProducto(id: number){
    this.productoService.deleteProducto(id).subscribe({
      next: () =>{
          this.listarProductos();
      },
      error: (e : Error) =>{
        console.log(e.message);
      }
    })
  }
}
