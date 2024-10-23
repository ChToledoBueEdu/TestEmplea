function quitarAcentosEnClaves(objeto) {
    // Mapa de vocales acentuadas a su versión sin acento
    const acentos = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U'
    };

    // Objeto donde se almacenarán las claves modificadas
    const nuevoObjeto = {};

    // Iterar sobre las claves del objeto
    for (const clave in objeto) {
        // Reemplazar vocales acentuadas por su versión sin acento
        const nuevaClave = clave.replace(/[áéíóúÁÉÍÓÚ]/g, letra => acentos[letra]);

        // Asignar el valor original a la nueva clave sin acento
        nuevoObjeto[nuevaClave] = objeto[clave];
    }

    return nuevoObjeto;
}

// Ejemplo de uso:
const objetoOriginal = {
    'árbol': 'verde',
    'canción': 'melodía',
    'Índice': 5,
    'último': 'fin'
};

export { quitarAcentosEnClaves }