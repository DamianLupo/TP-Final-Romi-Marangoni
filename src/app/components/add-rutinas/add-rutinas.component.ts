import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    imagen: ["",Validators.required],
    comments: this.fb.array([])
  });
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formrutinas.patchValue({
          imagen: reader.result as string
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  addRutina() {
    console.log(this.formrutinas.valid);
    if (this.formrutinas.invalid) return;

    const rutina: RutinaInterface = {
      ...this.formrutinas.getRawValue(),
      comments: []
    };
    rutina.id = this.rutinasService.setID();
    console.log("ID SETEADO EN: "+rutina.id);

    this.rutinasService.postRutina(rutina).subscribe({
      next: () => {
        console.log("Rutina subida exitosamente");
        this.router.navigate(["/home"]);
      },
      error: (e: Error) => {
        console.log("Error en la subida:", e);
      }
    });
  }
}

