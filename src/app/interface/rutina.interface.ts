import { ComentarioInterface } from "./comentario.interface";

export interface RutinaInterface {
  id: string;
  nombre: string;
  descripcion: string ;
  imagen: string;
  precio: number;
  urlDescarga: string;
  comments?: ComentarioInterface[]
}
