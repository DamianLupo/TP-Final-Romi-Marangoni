import { ComentarioInterface } from "./comentario.interface";

export interface Producto{
    id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    comments?: ComentarioInterface[]
}
