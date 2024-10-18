import { obtener } from "./inicio.js";

async function startScanner() {
    // Inicializar el lector de códigos de barras
    const codeReader = new ZXing.BrowserMultiFormatReader();
    const videoElement = document.getElementById('video');

    try {
        // Obtener los dispositivos de video disponibles
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
            return null;
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
                codeReader.reset();
                document.querySelector('#escaner').classList.add('oculto');
                obtener(result.text);
            }

            if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(`Error de escaneo: ${err}`);
                return null;
            }
        });
    } catch (err) {
        console.error(`Error al acceder a la cámara: ${err}`);
        return null;
    }
}

export {startScanner }
