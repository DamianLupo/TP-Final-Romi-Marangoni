import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutinaInterface } from '../../interface/rutina.interface';
import { RutinaServiceService } from '../../service/rutina.service.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-edit-rutina',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-rutina.component.html',
  styleUrl: './edit-rutina.component.css'
})
export class EditRutinaComponent implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {
    this.rutina= history.state.rutina;
    this.cargarForm();
    if (!this.usuariosService.usuarioEnSesion || !this.usuario?.isAdmin) {
      this.protectRoute()
    }
  }
  usuariosService = inject(UsuarioService);
  usuario = this.usuariosService.usuarioEnSesion;
  rutinaService= inject(RutinaServiceService);
  fb= inject(FormBuilder);
  rutina!: RutinaInterface;
  editform= this.fb.nonNullable.group({
    id: [""],
    nombre: ["", Validators.required],
    descripcion: ["", Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    urlDescarga: ["", Validators.required],
    imagen: ["", Validators.required]
  });
  cargarForm(){
    if(this.rutina){
      this.editform.patchValue(this.rutina);
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editform.patchValue({
          imagen: reader.result as string
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  editRutina(){
    if(!this.editform.valid)return;
    let rutina=this.editform.getRawValue();
    this.rutinaService.putRutina(rutina, Number(this.rutina.id)).subscribe(
      ()=>{
        console.log("Rutina editada exitosamente");
      },
      (e: Error)=>{
        console.log(e);
      }
    );
    this.router.navigate(["/home"]);
  }
  protectRoute()
  {
   this.router.navigate(['/acceso-denegado']);
  }


}
