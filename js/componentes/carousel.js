// Cambio de tarjeta
function cambiarTarjeta(){
    
    // Captura de botones
    let botonAnt = document.querySelector('#anterior');
    botonAnt.addEventListener('click', ev => {
        let actual = document.querySelector('div.visible');

        if (actual.previousElementSibling !== null) {
            actual.classList.remove('visible');
            actual.classList.add('oculto');
            actual.previousElementSibling.classList.remove('oculto');
            actual.previousElementSibling.classList.add('visible');
            document.querySelector('#evaluar').classList.add('oculto');
        }         
    });
    
    let botonSig = document.querySelector('#siguiente');
    botonSig.addEventListener('click', ev => {
        let actual = document.querySelector('div.visible');

        if (actual.nextElementSibling !== null){
            actual.classList.remove('visible');
            actual.classList.add('oculto');
            actual.nextElementSibling.classList.remove('oculto');
            actual.nextElementSibling.classList.add('visible');
            document.querySelector('#evaluar').classList.add('oculto');
        } else {
            document.querySelector('#evaluar').classList.remove('oculto');
            document.querySelector('#evaluar').classList.add('visible');
        }
    });
}


export { cambiarTarjeta }