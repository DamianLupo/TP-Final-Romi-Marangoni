import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../interface/producto.interface';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-add-productos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-productos.component.html',
  styleUrl: './add-productos.component.css'
})

export class AddProductosComponent {
  emitirProducto : EventEmitter<Producto> = new EventEmitter();

  fb = inject(FormBuilder);
  productoService = inject(ProductoService);

  formulario = this.fb.nonNullable.group({
    id: [0, [Validators.required]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    imagen: ['', [Validators.required]]
  })

  addProducto(){
    if(this.formulario.invalid) return ;

    const producto = this.formulario.getRawValue();
    this.addProductoDb(producto);
    this.emitirProducto.emit(producto);
  }

  addProductoDb(producto: Producto){
    this.productoService.postProducto(producto).subscribe({
      next: (producto : Producto) =>{
        console.log(producto);
        alert("Producto agregado correctamente");
      },
      error: (e : Error) =>{
        console.log(e.message);
      }
    })
  }

}
