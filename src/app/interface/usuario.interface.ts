export interface Usuario{
    id?: string,
    nombre: string,
    apellido: string,
    username: string,
    email: string,
    password: string,
    rutinas: [],
    productos: [],
    numDeTelefono: number,
    isAdmin: boolean
}