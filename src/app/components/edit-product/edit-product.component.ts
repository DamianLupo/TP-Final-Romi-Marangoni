import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from '../../interface/producto.interface';
import { ProductoService } from '../../service/producto.service';
import { UsuarioService } from '../../service/usuario.service';

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
  if (!this.usuariosService.usuarioEnSesion || !this.usuario?.isAdmin) {
    this.protectRoute()
  }

}
usuariosService = inject(UsuarioService);
usuario = this.usuariosService.usuarioEnSesion;
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
 protectRoute()
 {
  this.router.navigate(['/acceso-denegado']);
 }
}
