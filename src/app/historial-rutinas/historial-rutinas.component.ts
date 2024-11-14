import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoService } from '../service/mercado-pago.service';
import { RutinaServiceService } from '../service/rutina.service.service';
import { UsuarioService } from '../service/usuario.service';
import { RutinaInterface } from '../interface/rutina.interface';'../interface/rutina.interface';

@Component({
  selector: 'app-historial-rutinas',
  standalone: true,
  imports: [],
  templateUrl: './historial-rutinas.component.html',
  styleUrl: './historial-rutinas.component.css'
})
export class HistorialRutinasComponent {

  constructor(
    private route: ActivatedRoute,
    private mpService: MercadoPagoService,
    private router: Router
  ) {}
  comprado: boolean = true;
  usuarioService = inject(UsuarioService);
  rutinaService = inject(RutinaServiceService);
  rutina !: RutinaInterface;
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
      this.rutinaService.getRutinaid(id).subscribe(rutina => {
        this.rutina = rutina;

        if (!this.usuario.productos) {
          this.usuario.productos = [];
        }

        this.usuario.productos.push(this.rutina);

        this.usuarioService.actualizarUsuario(this.usuario).subscribe(() => {
          console.log('Historial actualizado correctamente');
        });
      });
    }
  }
  seeDetails(id: string | null) {
    this.router.navigate([`/detalles-rutinas/${id}`],{state:{comprado: this.comprado}});
  }
}
