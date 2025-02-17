import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../interface/producto.interface';
import { ProductoService } from '../../service/producto.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-add-productos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-productos.component.html',
  styleUrl: './add-productos.component.css'
})

export class AddProductosComponent implements OnInit {
  ngOnInit(): void {

    this.productoService.getProductos().subscribe({
      next: ()=>{
        console.log("Productos bajados exitosamente");
      },
      error: (e : Error) =>{
        console.log("Error al bajar los productos", e.message);
      }
    });
    if (!this.usuariosService.usuarioEnSesion || !this.usuario?.isAdmin) {
      this.protectRoute()
    }
  }
  constructor(private router: Router ){}
  usuariosService = inject(UsuarioService);
  usuario = this.usuariosService.usuarioEnSesion;
  fb = inject(FormBuilder);
  productoService = inject(ProductoService);

  formulario = this.fb.nonNullable.group({
    id: [""],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.required,Validators.min(1)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    imagen: ['', [Validators.required]],
    comments: [[]]
  })
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formulario.patchValue({
          imagen: reader.result as string
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addProducto() {
    if(this.formulario.invalid) return;


    this.productoService.getProductos().subscribe({
      next: () => {
        const producto = this.formulario.getRawValue();
        producto.id = this.productoService.setID();

        this.productoService.postProducto(producto).subscribe({
          next: () => {
            console.log("Producto agregado correctamente");
            this.router.navigate(['/home']);
          },
          error: (e: Error) => {
            console.log("Error al agregar el producto", e.message);
          }
        });
      },
      error: (e: Error) => {
        console.log("Error al obtener los productos", e.message);
      }
    });
  }
  protectRoute()
  {
   this.router.navigate(['/home']);
  }

}
