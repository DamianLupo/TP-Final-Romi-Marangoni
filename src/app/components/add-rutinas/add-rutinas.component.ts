import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { retry } from 'rxjs';
import { RutinaServiceService } from '../../service/rutina.service.service';
import { RutinaInterface } from '../../interface/rutina.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-rutinas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-rutinas.component.html',
  styleUrl: './add-rutinas.component.css'
})
export class AddRutinasComponent implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {
    this.rutinasService.getRutina().subscribe({
      next:()=>{
        console.log("Rutinas bajadas");
      },
      error: (e: Error)=>{
        console.log(`Error en la baja: ${e}`);
      }
    })
  }
  fb = inject(FormBuilder);
  rutinasService = inject(RutinaServiceService)
  formrutinas = this.fb.nonNullable.group({
    id: [""],
    nombre: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    precio: [0, [Validators.required, Validators.min(1)]],
    urlDescarga: ["urlexample.com"],
    imagen: [null,Validators.required]
  });
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file);
      
    }
  }
  addRutina()
  {
    let rutina : RutinaInterface
    rutina=this.formrutinas.getRawValue()

    rutina.id=this.rutinasService.setID()
    if(this.formrutinas.invalid)return;
    this.rutinasService.postRutina(rutina).subscribe({
      next: ()=>{
        console.log("Rutina subida exitosamente");
      },
      error: (e:Error)=>{
        console.log("Error en la subida");
      }
    })
    this.router.navigate(["/home"]);

  }
}
