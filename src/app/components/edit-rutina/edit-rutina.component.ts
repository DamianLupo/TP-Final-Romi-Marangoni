import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RutinaInterface } from '../../interface/rutina.interface';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RutinaServiceService } from '../../service/rutina.service.service';
import { Router } from '@angular/router';

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
  }
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

}
