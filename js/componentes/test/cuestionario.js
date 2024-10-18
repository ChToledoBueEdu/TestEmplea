import { evaluarCuestionario } from "./evaluar.js";

function crearCuestionario(datos){
    
    // Cálculo de total de preguntas y tarjetas
    let totalPreguntas = 0;
    datos.forEach(dato => {
        if (dato["Tipo"] === "Pregunta") totalPreguntas++; 
    });
    let totalTarjetas = Math.ceil(totalPreguntas / 5);

    let contenidoDinamico = document.querySelector('#contenidoDinamico');

    let cajaPregunta, pregunta, tipoRta, item;
    let respuestasUl = null; 
    let contadorId = 0;
    let items = [];
    let subCat = null;
    let rtaAux = null;

    let rta, chBox, etiqRta;

    let tarjeta, contadorTarjeta;
   
    for (let d of datos) {

        if (d["Tipo"] === "Item") {

            if (!items.includes(d["Texto"])) {
                items.push(d["Texto"]);
                item = d["Texto"];
            } 

        } else if (d["Tipo"] === "Pregunta") {
            
            if (subCat && d["Texto"] !== rtaAux) {
                rta.className = 'multiple';
                rta.append(etiqRta, subCat);
                respuestasUl.append(rta);
                subCat = null;
            }

            if (cajaPregunta) {
                cajaPregunta.append(respuestasUl);
                tarjeta.append(cajaPregunta);
            }

            if (contadorId % 5 == 0) {
                
                if (tarjeta) {
                    // Agrego el contador
                    tarjeta.append(contadorTarjeta);
                    // Agrego la tarjeta
                    contenidoDinamico.append(tarjeta);
                    // Visibilidad
                    contadorId > 5 ? tarjeta.classList.add('oculto') : tarjeta.classList.add('visible');
                }

                // Tarjeta carousel
                tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjetaDinamica');
                // Contador carousel
                contadorTarjeta = document.createElement('p');
                contadorTarjeta.style.textAlign = 'center';
                contadorTarjeta.className = 'contadorTarjeta';
                contadorTarjeta.innerHTML = `${Math.ceil(contadorId /5) + 1} de ${totalTarjetas}`;
            }
    
            // Auxiliares
            pregunta = d["Texto"];
            tipoRta = d["Valor"]
            
            // Caja de pregunta
            cajaPregunta = document.createElement('div');
            cajaPregunta.className = 'marco';
            let preguntaP = document.createElement('p');
            preguntaP.innerHTML = pregunta;
            cajaPregunta.append(preguntaP);
            respuestasUl = document.createElement('ul');

            contadorId++;

        } else if (d["Tipo"] === "Respuesta") {
            
            if (tipoRta != "select") {
                rta = document.createElement('li');
                chBox = document.createElement('input');
                chBox.type = tipoRta;
                chBox.name = pregunta;
                chBox.value = d["Valor"];
                chBox.className = item;
                chBox.id = `${d["Texto"]}${contadorId}`;
                etiqRta = document.createElement('label');
                etiqRta.setAttribute('for', `${d["Texto"]}${contadorId}`);
                etiqRta.innerHTML = d["Texto"];
                rta.append(chBox, etiqRta);
                respuestasUl.append(rta);

            } else {

                if (subCat && d["Texto"] !== rtaAux) {
                    rta.className = 'multiple';
                    rta.append(etiqRta, subCat);
                    respuestasUl.append(rta);
                    subCat = null;
                }

                if (!subCat){
                    rta = document.createElement('li');
                    rtaAux = d["Texto"];
                    etiqRta = document.createElement('label');
                    etiqRta.setAttribute('for', `${d["Texto"]}${contadorId}`);
                    etiqRta.innerHTML = rtaAux;
                    subCat = document.createElement('select');
                    let seleccione = document.createElement('option');
                    seleccione.value = 0;
                    seleccione.className = item;
                    seleccione.innerHTML = "Seleccione una opción";
                    subCat.append(seleccione);
                } 

                let opSubCat = document.createElement('option');
                opSubCat.setAttribute('value', d["Valor"]);
                opSubCat.setAttribute('name', pregunta);
                opSubCat.className = item;
                opSubCat.innerHTML = d["subcat"];
                subCat.append(opSubCat);
            }
        }
    }

    // Última pregunta (?)
    tarjeta.classList.add('oculto');
    cajaPregunta.append(respuestasUl);
    tarjeta.append(cajaPregunta);
    tarjeta.append(contadorTarjeta);
    contenidoDinamico.append(tarjeta);

    let form = document.querySelector('form');
    form.addEventListener('submit', ev => {
        evaluarCuestionario(items);
        ev.preventDefault();
    });
};

export { crearCuestionario }