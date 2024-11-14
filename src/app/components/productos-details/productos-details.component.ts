import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';
import { MercadoPagoService } from '../../service/mercado-pago.service';
import { ProductoService } from '../../service/producto.service';
import { UsuarioService } from '../../service/usuario.service';
import { PopUpWarningComponent } from '../pop-up-warning/pop-up-warning.component';
import { HistorialComponent } from '../historial/historial.component';

@Component({
  selector: 'app-productos-details',
  standalone: true,
  imports: [RouterLink, PopUpWarningComponent],
  templateUrl: './productos-details.component.html',
  styleUrl: './productos-details.component.css'
})
export class ProductosDetailsComponent implements OnInit {
  producto : any;
  isOpen: boolean = false;
  type: string = '';
  routes = inject(ActivatedRoute);
  productoService = inject(ProductoService);
  usuarioService = inject(UsuarioService);
  closeWarning = inject(MenuStateService);
  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.obtenerProducto(id);
    this.verificador=this.usuarioService.isAdmin();
    this.closeWarning.isOpenWarning$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.comprado=history.state.comprado;
  }
  verificador=false;
  comprado=false

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

  confirmAction(confirmed: string) {
    if (confirmed === 'eliminar') {
      this.deleteProducto();
    }
    else if (confirmed === 'editar') {
      this.editProduct();
    }
  }

  cancelAction(cancel: boolean) {
    this.isOpen = cancel;
    console.log(this.isOpen);
  }

  togglePopUp(){
    this.closeWarning.openWarning();
  }

  
}
