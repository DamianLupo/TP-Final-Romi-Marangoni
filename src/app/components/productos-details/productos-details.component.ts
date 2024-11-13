import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { MercadoPagoService } from '../../service/mercado-pago.service';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

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
  usuarioService = inject(UsuarioService);  

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.obtenerProducto(id);
    this.verificador=this.usuarioService.isAdmin();
  }
  verificador=false;

  obtenerProducto(id: string | null){
    this.productoService.getProducto(id).subscribe(producto => this.producto = producto);
  }

  constructor(private mercadoPagoService: MercadoPagoService, private router: Router) {}

  createPaymentPreference() {
    const title = this.producto.nombre;
    const quantity = 1;
    const unitPrice =  this.producto.precio;
    const productId = this.producto.id;

    this.mercadoPagoService.createPreference(title, quantity, unitPrice, productId).subscribe(
      response => {
        console.log('ID de la preferencia:', response.id);
        window.location.href = response.init_point; 
      },
      error => {
        console.error('Error al crear la preferencia', error);
      }
    );
  }
  deleteProducto(){
    this.productoService.deleteProducto(this.producto.id).subscribe({
      next: ()=>{
        console.log("Producto eliminado exitosamente");
      },
      error: (e : Error)=>{
        console.log("Error al eliminar el producto", e.message);
      }
    });
    this.router.navigate(['/home']);
    
  }
  
  editProduct()
  {
    this.router.navigate([`/editProduct/${this.producto.id}`], {state: {producto: this.producto}});
  }
}
