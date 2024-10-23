function calcularMayorEdad(fechaObjetivo) {
    // Convertir la fecha objetivo en un objeto Date
    const fechaFinal = new Date(fechaObjetivo);
    
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la diferencia en años
    let anios = fechaFinal.getFullYear() - fechaActual.getFullYear();

    // Comprobar si ya hemos pasado el mes/día en el año actual
    if (
        fechaFinal.getMonth() < fechaActual.getMonth() || 
        (fechaFinal.getMonth() === fechaActual.getMonth() && fechaFinal.getDate() < fechaActual.getDate())
    ) {
        anios--; // Restar un año si aún no hemos alcanzado el mes/día
    }

    let mayor;
    
    if (anios >= 18) mayor = true;
    else mayor = false;

    return mayor;
}

function calcularDiasDesde(fechaObjetivo) {
    // Convertir la fecha objetivo en un objeto Date
    const fechaFinal = new Date(fechaObjetivo);
    
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaFinal - fechaActual;

    // Convertir la diferencia de milisegundos a días (1 día = 24h * 60m * 60s * 1000ms)
    const dias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    return dias;
}


export { calcularMayorEdad, calcularDiasDesde }