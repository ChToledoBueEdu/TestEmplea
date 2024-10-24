// Cambio de tarjeta
function cambiarTarjeta(){
    
    // Calculo el total de tarjetas
    let tarjetas = document.querySelectorAll('.tarjetaDinamica');
    let iTarjeta = 0;
    tarjetas.forEach(t =>{
        t.index = iTarjeta;
        iTarjeta++
    });

    let totalTarjetas = tarjetas.length;

    // Captura de botones
    let botonAnt = document.querySelector('#anterior');
    botonAnt.addEventListener('click', ev => {
        let actual = document.querySelector('div.tarjetaDinamica.visible');

        if (actual.previousElementSibling !== null) {
            actual.classList.remove('visible');
            actual.classList.add('oculto');
            actual.previousElementSibling.classList.remove('oculto');
            actual.previousElementSibling.classList.add('visible');
            document.querySelector('#evaluar').classList.add('oculto');
        }         
        scrollTo({top: 450});
    });
    
    let botonSig = document.querySelector('#siguiente');
    botonSig.addEventListener('click', ev => {
        let actual = document.querySelector('div.tarjetaDinamica.visible');

        if (actual.nextElementSibling !== null){
            actual.classList.remove('visible');
            actual.classList.add('oculto');
            actual.nextElementSibling.classList.remove('oculto');
            actual.nextElementSibling.classList.add('visible');
            document.querySelector('#evaluar').classList.add('oculto');
            tarjetas.forEach(t => {
                if (t == actual.nextElementSibling && t.index === totalTarjetas - 1){
                    document.querySelector('#evaluar').classList.remove('oculto');
                    document.querySelector('#evaluar').classList.add('visible');
                } else {
                    scrollTo({top: 500});
                }
            });
        }
    });
}


export { cambiarTarjeta }