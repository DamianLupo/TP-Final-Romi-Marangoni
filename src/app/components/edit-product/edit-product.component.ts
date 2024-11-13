import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interface/producto.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../service/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
ngOnInit(): void {
  this.producto = history.state.producto;
  this.cargarForm();
  
}
constructor(private router: Router){}
productoService=inject(ProductoService);
 producto!: Producto;
 fb= inject(FormBuilder);  
 editform=this.fb.nonNullable.group({
  id: [""],
  nombre: ["", Validators.required],
  descripcion: ["", Validators.required],
  precio: [0, [Validators.required, Validators.min(1)]],
  imagen: ["", Validators.required]
 });
 cargarForm(){
  if(this.producto){
    this.editform.patchValue(this.producto);
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
 editProduct(){
  if(!this.editform.valid)return;
  let product=this.editform.getRawValue();
  this.productoService.putProducto(product, Number(this.producto.id)).subscribe(
    {
      next: ()=>{
        console.log("Producto editado exitosamente");
      },
      error: (e: Error)=>{
        console.log("Error al editar el producto", e);
      }
    }
  )
  this.router.navigate(['/home']);
 }
}
