import { registro } from "./componentes/identidad/inicio.js";
import { cargarDatos } from "./componentes/test/cargaTest.js";
import { cambiarTarjeta } from "./componentes/carousel.js"
import { cambiarEstiloSeleccion } from "./componentes/checkItem.js";

// Ruta del cuestionario
const rutaCuestionario = './data/TestDeEmpleabilidad-V2.json';

// Sitio (SPA)
const sitio = {
    inicio: './site/inicio.html',
    registro: './site/registro.html',
    test: './site/test.html'
}

// Cambia páginas
function cambiarPagina(docuHTML) {
    let contSPA = document.querySelector('#contenidoSPA');
    fetch(docuHTML)
        .then(rta => rta.text())
        .then(datos => contSPA.innerHTML = datos);
}

// Inicio 
window.addEventListener("DOMContentLoaded", function () {
    cambiarPagina(sitio.inicio);
    // Registro
    this.setTimeout(()=>{
        let continuar = document.querySelector('#continuar');
        continuar.addEventListener('click', function () {
            cambiarPagina(sitio.registro);
            setTimeout(registro, 300);
        });
    }, 500);
});


// Siguiente: Test
function realizarTest() {
    cambiarPagina(sitio.test);
    setTimeout(cargarDatos, 300, rutaCuestionario);
    setTimeout(cambiarTarjeta, 300);
    setTimeout(cambiarEstiloSeleccion, 500);
}

export { realizarTest }