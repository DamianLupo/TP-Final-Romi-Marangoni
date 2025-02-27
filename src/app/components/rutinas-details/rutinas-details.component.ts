import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmailService } from '../../service/email.service';
import { MenuStateService } from '../../service/menu-state.service';
import { MercadoPagoService } from '../../service/mercado-pago.service';
import { UsuarioService } from '../../service/usuario.service';
import { PopUpWarningComponent } from '../pop-up-warning/pop-up-warning.component';
import { RutinaServiceService } from './../../service/rutina.service.service';

@Component({
  selector: 'app-rutinas-details',
  standalone: true,
  imports: [PopUpWarningComponent, RouterLink, DatePipe, FormsModule],
  templateUrl: './rutinas-details.component.html',
  styleUrl: './rutinas-details.component.css'
})
export class RutinasDetailsComponent implements OnInit {
  rutina : any;
  isOpen: boolean = false;
  type: string = '';
  routes = inject(ActivatedRoute);
  newComment: string ="";
  rutinaService = inject(RutinaServiceService);
  closeWarning = inject(MenuStateService);

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.obtenerRutinaId(id);
    this.verificador = this.usuarioService.isAdmin();
    this.closeWarning.isOpenWarning$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    
    // Verificar si el usuario ya tiene la rutina comprada
    if (this.usuarioService.usuarioEnSesion?.rutinas) {
      this.comprado = this.usuarioService.usuarioEnSesion.rutinas.some(
        rutina => rutina.id === id
      );
    }
  }
  comprado: boolean = false;
  usuarioService = inject(UsuarioService);
  obtenerRutinaId(id: string | null){
    this.rutinaService.getRutinaid(id).subscribe(rutina => this.rutina = rutina);
  }
  verificador=false;
  constructor(private mercadoPagoService: MercadoPagoService,private router: Router, private emailService: EmailService) {}

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
    const title = this.rutina.nombre;
    const quantity = 1;
    const unitPrice =  this.rutina.precio;
    const id = this.rutina.id;

    if(this.usuarioService.usuarioEnSesion){
    this.mercadoPagoService.createPreference(title, quantity, unitPrice, id).subscribe(
      response => {
        console.log('ID de la preferencia:', response.id);
        window.location.href = response.init_point;
        if(this.usuarioService.usuarioEnSesion?.rutinas){
          this.usuarioService.usuarioEnSesion.rutinas.push(this.rutina);
          localStorage.setItem('usuarioEnSesion', JSON.stringify(this.usuarioService.usuarioEnSesion));
          this.usuarioService.putUser(this.usuarioService.usuarioEnSesion, this.usuarioService.usuarioEnSesion?.id).subscribe({
            next: ()=>{
              console.log("Rutina agregada exitosamente");
              this.router.navigate([`/home`]);
            },
            error: (e: Error)=>{
              console.log("Error al agregar la rutina", e);
            }
          });
        }
          this.email.to = this.usuarioService.usuarioEnSesion?.email || '';
          this.email.product = this.rutina.nombre;
          this.email.price = this.rutina.precio;
          const data = this.sendEmail();
          console.log(data);
      },
      error => {
        console.error('Error al crear la preferencia', error);
      },

    );
  }else{
    this.router.navigate([`/login`]);
  }
  }
  deleteRutina(){
    this.rutinaService.deleteRutina(this.rutina.id).subscribe({
      next: () => {
        console.log("Rutina eliminada exitosamente");
      },
      error: (e : Error) => {
        console.log("Error al eliminar la rutina", e);
      }
    });
    this.router.navigate(["/home"]);
  }
  editRutina(){

    this.router.navigate([`/editRutina/${this.rutina.id}`], {state: {rutina: this.rutina}});
  }

  confirmAction(confirmed: string) {
    if (confirmed === 'eliminar') {
      this.deleteRutina();
    }
    else if (confirmed === 'editar') {
      this.editRutina();
    }
  }
  togglePopUp(){
    this.closeWarning.openWarning();
  }
  addComment() {
    if (!this.newComment.trim()) return;
    if (!this.rutina.comments) {
      this.rutina.comments = [];
    }

    const comment = {
      id: Date.now().toString(),
      author: this.usuarioService.usuarioEnSesion?.username || 'Anónimo',
      fecha: new Date(),
      body: this.newComment.trim()
    };

    this.rutina.comments.push(comment);
    this.rutinaService.putRutina(this.rutina, this.rutina.id).subscribe({
      next: () => {
        this.newComment = '';
        console.log('Comentario agregado exitosamente');
        this.router.navigate(['/detalles-rutinas/${rutina.id)'])
      },
      error: (e) => console.error('Error al agregar comentario:', e)
    });
  }

}
