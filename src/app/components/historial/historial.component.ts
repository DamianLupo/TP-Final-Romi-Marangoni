import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MercadoPagoService } from '../../service/mercado-pago.service';
import { UsuarioService } from '../../service/usuario.service';
import { Producto } from '../../interface/producto.interface';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})

export class HistorialComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private mpService: MercadoPagoService,
  ) {}

  usuarioService = inject(UsuarioService);
  productoService = inject(ProductoService);
  producto !: Producto;
  usuario : any = this.usuarioService.usuarioEnSesion;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      const status = params['status'];
      
      if (status === 'approved') {
        this.handleSuccessfulPayment(paymentId);
      }
    });
  }

  private handleSuccessfulPayment(paymentId: string) {
    this.mpService.checkPaymentStatus(paymentId).subscribe({
      next: (response) => {
        this.actualizarEstadoPedido(response.external_reference);
      },
      error: (error) => {
        console.error('Error al verificar el pago:', error);
      }
    });
  }

  private actualizarEstadoPedido(id: string | null) {
    if (this.usuario) {
      this.productoService.getProducto(id).subscribe(producto => {
        this.producto = producto;
        
        if (!this.usuario.productos) {
          this.usuario.productos = [];
        }
        
        this.usuario.productos.push(this.producto);
  
        this.usuarioService.actualizarUsuario(this.usuario).subscribe(() => {
          console.log('Historial actualizado correctamente');
        });
      });
    }
  }
}
