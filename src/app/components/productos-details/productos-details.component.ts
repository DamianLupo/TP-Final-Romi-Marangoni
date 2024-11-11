import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { MercadoPagoService } from '../../service/mercado-pago.service';

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

  constructor(private mercadoPagoService: MercadoPagoService) {}

  createPaymentPreference() {
    const title = this.producto.nombre;
    const quantity = 1;
    const unitPrice =  this.producto.precio;

    this.mercadoPagoService.createPreference(title, quantity, unitPrice).subscribe(
      response => {
        console.log('ID de la preferencia:', response.id);
        window.location.href = response.init_point; 
      },
      error => {
        console.error('Error al crear la preferencia', error);
      }
    );
  }
}
