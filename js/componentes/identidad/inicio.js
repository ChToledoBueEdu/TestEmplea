import { startScanner } from "./escanerQR.js";
import { realizarTest } from "../../main.js";
import { encriptar } from "./encriptado.js";
import { tokenizar } from "../conexion/apiToken.js";
import { consultar } from "../conexion/conectar.js";
import { crear } from "../conexion/conectar.js";
import { calcularMayorEdad, calcularDiasDesde } from "./periodos.js";
import { graficar } from "../test/graficos.js";


async function validar(datosDocumento) {
    ///////////////////////////////////////
    // VER MAYORÍA DE EDAD
    let nac = datosDocumento[6].split('/');
    nac = `${nac[2]}-${nac[1]}-${nac[0]}`;
    calcularMayorEdad(nac);
    ///////////////////////////////////////
    
    let documento = datosDocumento[4];
    let id_dcript = await encriptar.encryptDocument(documento)
                        .then(encrypted => encrypted);
    let token = await tokenizar();
    let urlPersona = 'https://chtolecac.pythonanywhere.com/personas/';
    let urlTest = 'https://chtolecac.pythonanywhere.com/test/';

    // Enviar consulta al back: 
    // 1- si no existe => crear Persona
    // 2- si nunca lo hizo => habilitar test
    // 3- si lo hizo => ¿pasaron 6 meses? SI => habilitar test
    //                                 NO => mostrar resultados

    // Consulta Persona
    let persona = await consultar(token.access, urlPersona, id_dcript);

    if (persona != null && !Number.isInteger(persona)) {
        let test = await consultar(token.access, urlTest, id_dcript);
        sessionStorage.setItem('tk', token.access);
        sessionStorage.setItem('id_dcript', id_dcript);

        if (test != null && !Number.isInteger(test) &&
            calcularDiasDesde(test.fecha_test) < 180) {
            // Armar resultados con datos anteriores
            delete test.id_dcript;
            delete test.fecha_test;
            graficar(test, false);

        } else {
            document.querySelector('#confirmarId').classList.remove('oculto');
            let botonConfirmar = document.querySelector('#confirmarId');
            botonConfirmar.addEventListener('click', ev => realizarTest());
        }

    } else {
        let nac = datosDocumento[6].split('/');
        nac = `${nac[2]}-${nac[1]}-${nac[0]}`;
        let data = {
            "id_dcript": id_dcript,
            "fecha_nac": nac,
            "genero": datosDocumento[3]
        }
        let nvaPersona = crear(token.access, urlPersona, data);

        if (nvaPersona) {
            sessionStorage.setItem('tk', token.access);
            sessionStorage.setItem('id_dcript', id_dcript);
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
    // Armar REGEX
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