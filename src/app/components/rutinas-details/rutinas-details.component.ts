import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoService } from '../../service/mercado-pago.service';
import { UsuarioService } from '../../service/usuario.service';
import { RutinaServiceService } from './../../service/rutina.service.service';

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
    this.verificador=this.usuarioService.isAdmin();
  }
  usuarioService = inject(UsuarioService);
  obtenerRutinaId(id: string | null){
    this.rutinaService.getRutinaid(id).subscribe(rutina => this.rutina = rutina);
  }
  verificador=false;
  constructor(private mercadoPagoService: MercadoPagoService,private router: Router) {}

  createPaymentPreference() {
    const title = this.rutina.nombre;
    const quantity = 1;
    const unitPrice =  this.rutina.precio;
    const id = this.rutina.id;
    

    this.mercadoPagoService.createPreference(title, quantity, unitPrice, id).subscribe(
      response => {
        console.log('ID de la preferencia:', response.id);
        window.location.href = response.init_point;
      },
      error => {
        console.error('Error al crear la preferencia', error);

      }
    );
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

}
