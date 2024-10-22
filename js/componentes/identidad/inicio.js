import { startScanner } from "./escanerQR.js";
import { realizarTest } from "../../main.js";
import { encriptar } from "./encriptado.js";
import { tokenizar } from "./conexion/apiToken.js";
import { consultar } from "./conexion/conectar.js";
import { crear } from "./conexion/conectar.js";



async function validar(datosDocumento) {
    let documento = datosDocumento[4];
    let id_dcript = await encriptar.encryptDocument(documento)
                        .then(encrypted => encrypted);
    let token = await tokenizar();
    let urlPersona = 'http://127.0.0.1:8000/personas/';
    let urlTest = 'http://127.0.0.1:8000/test/';

    // Enviar consulta al back: 
    // 1- si no existe => crear Persona
    // 2- si nunca lo hizo => habilitar test
    // 3- si lo hizo => ¿pasaron 6 meses? SI => habilitar test
    //                                 NO => mostrar resultados

    let persona = await consultar(token.access, urlPersona, id_dcript);

    if (persona != null && !Number.isInteger(persona)) {
        let test = consultar(token.access, urlTest, id_dcript);

        if (test != null && !Number.isInteger(test)) {
            console.log('Ya hizo el test!!!');
            // Armar resultados con datos anteriores
        } else {
            document.querySelector('#confirmarId').classList.remove('oculto');
            let botonConfirmar = document.querySelector('#confirmarId');
            botonConfirmar.addEventListener('click', ev => realizarTest());
        }

    } else {
        let data = {
            "id_dcript": id_dcript,
            "fecha_nac": datosDocumento[6],
            "genero": datosDocumento[3]
        }
        let nvaPersona = crear(token.access, urlPersona, data);

        if (nvaPersona) {
            document.querySelector('#confirmarId').classList.remove('oculto');
            let botonConfirmar = document.querySelector('#confirmarId');
            botonConfirmar.addEventListener('click', ev => realizarTest());
        } else {
            let rechazo = 'No se pudo validar tu documento.'
            document.querySelector('#queryResult').innerHTML = rechazo;
        }
    }
}

function obtener(documento) {
    // Formato documento de identidad
    // nro_tramite@APELLIDO@NOMBRE/S@SEXO@nro_dni@EJEMPLAR@fecha_nac(dd/mm/AAAA)@fecha_emision(dd/mm/AAAA)@239

    if (documento) {
        let datos = documento.split('@');
        document.querySelector('#preparar').classList.remove('oculto');
        mostrarIdentidad(datos[2]);
        validar(datos);
    } else {
        mostrarIdentidad(null);
    }
}

function mostrarIdentidad(nombre) {
    let resultado = document.querySelector('#result');
    
    if (nombre) {
        resultado.innerHTML = `¡Hola ${nombre}!`;
    } else {
        resultado.innerHTML = 'No se pudo acceder a la cámara. Asegúrate de que el navegador tiene permisos.'
    }
}

function registro() {
    let botonEscanear = document.querySelector('#escanear');
    botonEscanear.addEventListener('click', async () => {
        document.querySelector('.imgRegistrar').classList.add('oculto');
        document.querySelector('.imgRegistrar').classList.remove('imgRegistrar');
        let escaner = document.querySelector('#escaner');
        escaner.classList.remove('oculto');
        let botonEscanear = document.querySelector('#escanear');
        botonEscanear.classList.add('oculto'); 
        startScanner(); // luego del escaneo llama a obtener
    });
}

export { obtener }
export { registro }