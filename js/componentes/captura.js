// Botón de captura y descarga
let descargar = function (fragmento) {
        html2canvas(document.querySelector(fragmento))
            .then(function(canvas) {

            // Convert the canvas to a data URL
            const dataURL = canvas.toDataURL('image/png');

            // Create an anchor element
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'descarga.png';
            
            // Trigger a click event on the anchor to start the download
            link.click();
            });
};


export { descargar }