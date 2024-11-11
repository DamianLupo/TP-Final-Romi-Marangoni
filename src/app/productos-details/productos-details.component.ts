import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-productos-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos-details.component.html',
  styleUrl: './productos-details.component.css'
})
export class ProductosDetailsComponent implements OnInit {
  producto : any;

  routes = inject(ActivatedRoute);
  productoService = inject(ProductoService);

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.obtenerProducto(id);
  }

  obtenerProducto(id: string | null){
    this.productoService.getProducto(id).subscribe(producto => this.producto = producto);
  }
}
