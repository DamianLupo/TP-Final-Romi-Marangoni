import { Usuario } from "./usuarios.mjs";
const url="http://localhost:3000/Usuarios";

export async function postUsuarios(usuarios) {
    try {
        for(let usuario of usuarios)
        {
            let usuario_a_cargar={
                id: usuario.id,
                nombre:usuario.nombre,
                apellido:usuario.apellido,
                username:usuario.username,
                email:usuario.getEmail(),
                password:usuario.getPassword(),
                rutinas:usuario.rutinas, 
                productos:usuario.productos, 
                numDeTelefono:usuario.numDeTelefono
            };
            const response= await fetch(url,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(usuario_a_cargar)
            });
            if(!response.ok)
            {
                throw new Error (`Error en la carga del Json ${response.status}`);
            }
            else
            {
                console.log("Json cargado correctamente");
            }
        }
        
    } catch (error) {
        throw error;
    }
}
export async function getUsuarios() {
    try {
        const response= await fetch(url)
        if(!response.ok)
        {
            throw new Error (`Error en la baja del Json: ${response.status}`)
        }
        else{
            console.log("Json bajado correctamente");
            let usuarios= await response.json();
            let usuariosClass=[];
            usuarios.forEach(usuario => {
                let usuarioArray=new Usuario(usuario.nombre,usuario.apellido,usuario.username,usuario.email,usuario.password,usuario.numDeTelefono);
                usuariosClass.push(usuarioArray);
            });
            return usuariosClass;  //Hecho asi para que los retorne con sus propiedades
        }
    } catch (error) {
        throw error;
    }
    
}

