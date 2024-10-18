import { startScanner } from "./escanerQR.js";
import { test } from "../../main.js";
import { encriptar } from "./encriptado.js";

function validar(id_dcript) {
    console.log(id_dcript);
    // Enviar consulta al back, 
    // si nunca lo hizo => habilitar test
    // si lo hizo => ¿pasaron 6 meses? SI => habilitar test
    //                                 NO => mostrar resultados
}


function obtener(documento) {
    // Formato documento de identidad
    // nro_tramite@APELLIDO@NOMBRE/S@SEXO@nro_dni@EJEMPLAR@fecha_nac(dd/mm/AAAA)@fecha_emision(dd/mm/AAAA)@239

    if (documento) {
        let datos = documento.split('@');
        document.querySelector('#preparar').classList.remove('oculto');
        mostrarIdentidad(datos[2]);
        encriptar.encryptDocument(datos[4])
                .then(encrypted => {validar(encrypted)});
    } else {
        mostrarIdentidad(null);
    }
}

function mostrarIdentidad(nombre) {
    let resultado = document.querySelector('#result');
    
    if (nombre) {
        resultado.innerHTML = `¡Hola ${nombre}!`;
        // document.querySelector('#confirmarId').classList.remove('oculto');
    } else {
        resultado.innerHTML = 'No se pudo acceder a la cámara. Asegúrate de que el navegador tiene permisos.'
    }
}

function registro() {
    let botonEscanear = document.querySelector('#escanear');
    botonEscanear.addEventListener('click', async () => {
        let escaner = document.querySelector('#escaner');
        escaner.classList.remove('oculto');
        let botonEscanear = document.querySelector('#escanear');
        botonEscanear.classList.add('oculto'); 
        startScanner(); // luego del escaneo llama a obtener
    });
    
    let botonConfirmar = document.querySelector('#confirmarId');
    botonConfirmar.addEventListener('click', test);
}

export { obtener }
export { registro }