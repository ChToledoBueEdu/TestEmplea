const encriptar = (() => {
    const encoder = new TextEncoder();
    const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // IV fijo de 12 bytes

    // Función para derivar una clave determinista a partir del documento
    async function deriveKey(documentNumber) {
        // Convierte el número de documento a un array de bytes
        const encodedDoc = encoder.encode(documentNumber.toString());

        // Genera un hash SHA-256 del número de documento
        const hash = await crypto.subtle.digest("SHA-256", encodedDoc);

        // Deriva una clave AES-GCM a partir del hash
        return crypto.subtle.importKey(
            "raw",
            hash,
            { name: "AES-GCM" },
            false,
            ["encrypt"]
        );
    }

    // Función para encriptar el número de documento
    async function encryptDocument(documentNumber) {
        // Validar que el documento esté en el rango permitido
        if (documentNumber < 9999999 || documentNumber > 99999999) {
            throw new Error("El número de documento debe estar entre 9999999 y 99999999.");
        }

        // Derivar la clave a partir del documento
        const key = await deriveKey(documentNumber);

        // Encriptar el documento
        const encodedData = encoder.encode(documentNumber.toString());
        const encryptedData = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encodedData
        );

        // Retornar los datos encriptados como base64
        return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    }

    // Exportar las funciones del módulo
    return {
        encryptDocument
    };
})();

// Ejemplo de uso:
// encriptar.encryptDocument(12345678).then(encrypted => {
//     console.log(encrypted); // Imprime el valor encriptado, siempre igual para el mismo número
// });

export { encriptar }