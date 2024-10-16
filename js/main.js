import { cargarDatos } from "./componentes/carga.js";
import { cambiarTarjeta } from "./componentes/carousel.js"
import { cambiarEstiloSeleccion } from "./componentes/checkItem.js";

// Ruta del cuestionario
const rutaCuestionario = './data/TestDeEmpleabilidad-V2.json';

window.addEventListener("DOMContentLoaded", evento => {
    cargarDatos(rutaCuestionario);
    setTimeout(cambiarTarjeta, 300);
    setTimeout(cambiarEstiloSeleccion, 300);
    evento.preventDefault();
});