import { RutinaServiceService } from './../../service/rutina.service.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MercadoPagoService } from '../../service/mercado-pago.service';

@Component({
  selector: 'app-rutinas-details',
  standalone: true,
  imports: [],
  templateUrl: './rutinas-details.component.html',
  styleUrl: './rutinas-details.component.css'
})
export class RutinasDetailsComponent implements OnInit {
  rutina : any;

  routes = inject(ActivatedRoute);
  rutinaService = inject(RutinaServiceService);

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.obtenerRutinaId(id);
  }

  obtenerRutinaId(id: string | null){
    this.rutinaService.getRutinaid(id).subscribe(rutina => this.rutina = rutina);
  }

  constructor(private mercadoPagoService: MercadoPagoService) {}

  createPaymentPreference() {
    const title = this.rutina.nombre;
    const quantity = 1;
    const unitPrice =  this.rutina.precio;

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
