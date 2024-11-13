import { Producto } from "./producto.interface";
import { RutinaInterface } from "./rutina.interface";

export interface Usuario{
    id?: string,
    nombre: string,
    apellido: string,
    username: string,
    email: string,
    password: string,
    rutinas?: RutinaInterface[],
    productos?: Producto[],
    numDeTelefono: number,
    isAdmin: boolean
}