import { crearCuestionario } from "./cuestionario.js";

// Carga de los datos externos
async function cargarDatos(ruta) {
    let data = await fetch(ruta)
                        .then(respuesta => respuesta.json());
    crearCuestionario(data);
}

export { cargarDatos }