async function startScanner() {
    // Inicializar el lector de códigos de barras
    const codeReader = new ZXing.BrowserMultiFormatReader();
    const videoElement = document.getElementById('video');
    // const resultElement = document.getElementById('result');
    let resultElement;

    try {
        // Obtener los dispositivos de video disponibles
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
            resultElement.textContent = 'No se encontraron dispositivos de video.';
            return;
        }

        // Buscar una cámara trasera (si está disponible)
        const backCamera = videoInputDevices.find(device =>
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('environment')
        );

        const selectedDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId;

        // Iniciar el escaneo de video usando la cámara seleccionada
        codeReader.decodeFromVideoDevice(selectedDeviceId, videoElement, (result, err) => {
            if (result) {
                resultElement = result.text;
                codeReader.reset();
                // Detener el escaneo después de un escaneo exitoso
            }

            if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(`Error de escaneo: ${err}`);
                resultElement = null;;
            }
        });
    } catch (err) {
        console.error(`Error al acceder a la cámara: ${err}`);
        resultElement = null;
    }

    return resultElement;
}

// Iniciar el escáner cuando se cargue la página
// window.addEventListener('load', startScanner);
export {startScanner }
