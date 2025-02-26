import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmailService } from '../../service/email.service';
import { MenuStateService } from '../../service/menu-state.service';
import { MercadoPagoService } from '../../service/mercado-pago.service';
import { ProductoService } from '../../service/producto.service';
import { UsuarioService } from '../../service/usuario.service';
import { PopUpWarningComponent } from '../pop-up-warning/pop-up-warning.component';

@Component({
  selector: 'app-productos-details',
  standalone: true,
  imports: [RouterLink, PopUpWarningComponent, FormsModule, DatePipe],
  templateUrl: './productos-details.component.html',
  styleUrl: './productos-details.component.css'
})
export class ProductosDetailsComponent implements OnInit {
  producto : any;
  isOpen: boolean = false;
  type: string = '';
  newComment: string ="";
  routes = inject(ActivatedRoute);
  productoService = inject(ProductoService);
  usuarioService = inject(UsuarioService);
  comprado: boolean = false;
  closeWarning = inject(MenuStateService);


  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.obtenerProducto(id);
    this.verificador=this.usuarioService.isAdmin();
    this.closeWarning.isOpenWarning$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.comprado= history.state.comprado;
  }
  verificador=false;

  obtenerProducto(id: string | null){
    this.productoService.getProducto(id).subscribe(producto => {
      this.producto = producto;
      if (!this.producto.comments) {
        this.producto.comments = [];
      }
    });
  }

  constructor(private mercadoPagoService: MercadoPagoService, private router: Router, private emailService: EmailService) {}

  email = { to: '', product: '', price: 0 };
  message = '';

  sendEmail() {
    if (!this.email.to || !this.email.product || !this.email.price) {
      this.message = '❌ Please fill in all fields.';
      return;
    }

    this.emailService.sendEmail(this.email.to, this.email.product, this.email.price).subscribe({
      next: () => {
        this.message = '✅ Email sent successfully!';
        console.log(this.message);
      },
      error: (error) => {
        console.error('❌ Error sending email', error);
        this.message = '❌ Could not send the email.';
      }
    });
      this.message = '❌ Could not send the email.';
}

  createPaymentPreference() {
    const title = this.producto.nombre;
    const quantity = 1;
    const unitPrice =  this.producto.precio;
    const productId = this.producto.id;

    if(this.usuarioService.usuarioEnSesion){
      this.mercadoPagoService.createPreference(title, quantity, unitPrice, productId).subscribe(
        response => {
          console.log('ID de la preferencia:', response.id);
          window.location.href = response.init_point;
          if(this.usuarioService.usuarioEnSesion?.productos){
            this.usuarioService.usuarioEnSesion.productos.push(this.producto);
            localStorage.setItem('usuarioEnSesion', JSON.stringify(this.usuarioService.usuarioEnSesion));
            this.usuarioService.putUser(this.usuarioService.usuarioEnSesion, this.usuarioService.usuarioEnSesion.id).subscribe({
              next: ()=>{
                console.log("Producto agregado al usuario");
              },
              error: (e: Error)=>{
                console.log("Error al agregar el producto al usuario", e.message);
              }
            });
          }
          this.email.to = this.usuarioService.usuarioEnSesion?.email || '';
          this.email.product = this.producto.nombre;
          this.email.price = this.producto.precio;
          const data = this.sendEmail();
          console.log(data);
        },
        error => {
          console.error('Error al crear la preferencia', error);
        }
      );
    }else{
      this.router.navigate([`/login`]);
    }
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
  addComment() {
    if (!this.newComment.trim()) return;
    if (!this.producto.comments) {
      this.producto.comments = [];
    }

    const comment = {
      id: Date.now().toString(),
      author: this.usuarioService.usuarioEnSesion?.username || 'Anónimo',
      fecha: new Date(),
      body: this.newComment.trim()
    };

    this.producto.comments.push(comment);
    this.productoService.putProducto(this.producto, this.producto.id).subscribe({
      next: () => {
        this.newComment = '';
        console.log('Comentario agregado exitosamente');
        this.router.navigate(['/detalles/${producto.id)'])
      },
      error: (e) => console.error('Error al agregar comentario:', e)
    });
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

  togglePopUp(){
    this.closeWarning.openWarning();
  }

}
