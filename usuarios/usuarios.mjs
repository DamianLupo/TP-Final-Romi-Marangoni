export class Usuario {
    static idAutoGenerado=0;
    nombre
    apellido
    username
    #email
    #password
    rutinas 
    productos 
    numDeTelefono
    constructor (nombre,apellido,username,email,password,numDeTelefono)
    {
        this.nombre=nombre;
        this.apellido=apellido;
        this.username=username;
        this.#email=email;
        this.id=Usuario.idAutoGenerado++;
        this.#password=password;
        this.numDeTelefono=numDeTelefono;
        this.productos=[];
        this.rutinas=[]
    }
    getEmail()
    {
        return this.#email;
    };
    getPassword()
    {
        return this.#password;
    }
    toString()
    {
        console.log(`Nombre: ${this.nombre},Apellido: ${this.apellido},Nombre de usuario: ${this.username}, Email: ${this.getEmail()},id: ${this.id}, Contraseña: ${this.getPassword()} Numero telefonico: ${this.numDeTelefono}`);
    }

}