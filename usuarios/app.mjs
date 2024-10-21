import { Usuario } from "./usuarios.mjs";
import { postUsuarios } from "./creacion.mjs";
import { getUsuarios } from "./creacion.mjs";
const dami=new Usuario("Damian","Lupo","Dami_Lupo","lupencio42@gmail.com","AmoMiRenault21",2234386677);
const matte=new Usuario("Matteo","Daniele","Matte_Daniele","matteodaniele222@gmail.com","AmoMiCorven110",2235919553);
const pilas=new Usuario("Matteo","Manco","Pilas","mancmatteo@gmail.com","AmoMiChevroletTracker",2235831463);
const lucho=new Usuario("Luciano","Marangoni","Marrongoni","luchogoma@gmail.com","AmoTomarElBondi",2235486645);
let usuarios=[dami,matte,pilas,lucho];
async function postArray(array) {
    try {
        const response=await postUsuarios(array);
        if(response.ok)
        {
            console.log("Carga realizada");
        }
    } catch (error) {
        console.log(`Error en la carga de usuarios ${error.status}`);
    }
    
}
async function testJsonServer() {
    try {
        let usuarios= await getUsuarios();
        return usuarios;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    
}
//postArray(usuarios);
let usuariosBajados=await testJsonServer();
usuariosBajados.forEach(usuario => {
    usuario.toString();
});