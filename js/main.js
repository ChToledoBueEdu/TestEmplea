import { cargarDatos } from "./componentes/carga.js";
import { cambiarTarjeta } from "./componentes/carousel.js"

// Ruta del cuestionario
const rutaCuestionario = './data/testEmpleabilidad.json';

window.addEventListener("DOMContentLoaded", evento => {
    cargarDatos(rutaCuestionario);
    setTimeout(cambiarTarjeta, 500);
    
});