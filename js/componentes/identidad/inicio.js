import { startScanner } from "./escanerQR.js";
import { test } from "../../main.js";

function registro() {
    let botonEscanear = document.querySelector('#escanear');
    let botonConfirmar = document.querySelector('#confirmarId');
    
    botonEscanear.addEventListener('click',ev => {
        let escaner = document.querySelector('#escaner');
        escaner.classList.remove('oculto');
        botonEscanear.classList.add('oculto');
        let identidad = startScanner()
        // let resultado = document.querySelector('#result');
        // if (identidad) {
        //     let datos = identidad.split('@');
        //     resultado.innerHTML = `¡Hola! ${datos}`;
        //     document.querySelector('#confirmarId').classList.remove('oculto');
        // } else {
        //     resultado.innerHTML = 'No se pudo acceder a la cámara. Asegúrate de que el navegador tiene permisos.'
        // }
    });

    botonConfirmar.addEventListener('click', ev => test());
}

export { registro }