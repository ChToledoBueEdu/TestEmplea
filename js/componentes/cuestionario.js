import { evaluarCuestionario } from "./evaluar.js";

function crearCuestionario(datos){
    
    let totalPreguntas = 0;
    datos.forEach(dato => {
        if (dato["Tipo"] === "Pregunta") totalPreguntas++; 
    });
    let totalTarjetas = Math.ceil(totalPreguntas / 5);

    let contenidoDinamico = document.querySelector('#contenidoDinamico');   
    let divItem, respuestasUl, pregunta, tipoRta, item;
    let contadorId = 0;
    let items = [];
    let subCat = 0;
    let rtaAux = 0;

    let rta, chBox, etiqRta;

    let tarjeta, contadorTarjeta;
   
    for (let d of datos) {

        if (d["Tipo"] === "Item") {

            if (!items.includes(d["Texto"])) {
                items.push(d["Texto"]);
                item = d["Texto"];
            } 

        } else if (d["Tipo"] === "Pregunta"){

            if (contadorId % 5 == 0 || contadorId + 1 == totalPreguntas) {
                
                if (tarjeta) {
                    tarjeta.append(contadorTarjeta);
                    contenidoDinamico.append(tarjeta);
                }

                tarjeta = document.createElement('div');
                tarjeta.classList = ['tarjetaDinamica'];
                contadorTarjeta = document.createElement('p');
                contadorTarjeta.style.textAlign = 'center';
                contadorTarjeta.className = 'contadorTarjeta';
                contadorTarjeta.innerHTML = `${Math.ceil(contadorId /5) + 1} de ${totalTarjetas}`;

                if (contadorId == 0){
                    tarjeta.classList.add('visible')
                } else {
                    tarjeta.classList.add('oculto')
                }
            }

            if (subCat) {
                rta.className = 'multiple';
                rta.append(etiqRta, subCat);
                respuestasUl.append(rta);
                divItem.append(respuestasUl);
                subCat = 0;
                rtaAux = 0;
            } 

            pregunta = d["Texto"];
            divItem = document.createElement('div');
            divItem.className = 'marco';
            let preguntaP = document.createElement('p');
            preguntaP.innerHTML = d["Texto"];
            divItem.append(preguntaP);
            respuestasUl = document.createElement('ul');

            tipoRta = d["Valor"];
            contadorId++;

        } else if (d["Tipo"] === "Respuesta") {
            
            if (rtaAux != d["Texto"]){

                if (subCat) {
                    rta.className = 'multiple';
                    rta.append(etiqRta, subCat);
                    respuestasUl.append(rta);
                    divItem.append(respuestasUl);
                    subCat = 0;
                    rtaAux = 0;
                } 
            }

            if (rtaAux == 0 || rtaAux != d["Texto"]) {
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
            }
            
            if (d["Subcat"] !== "") { 
                let opSubCat = document.createElement('option');
                opSubCat.setAttribute('value', d["Valor"]);
                opSubCat.setAttribute('name', pregunta);
                opSubCat.className = item;
                opSubCat.innerHTML = d["Subcat"];
                
                if (subCat == 0){ 
                    rtaAux = d["Texto"];
                    subCat = document.createElement('select');
                    let seleccione = document.createElement('option');
                    seleccione.value = 0;
                    seleccione.className = item;
                    seleccione.innerHTML = "Seleccione una opción";
                    subCat.append(seleccione);
                }

                subCat.append(opSubCat);
                continue;
            }

            rta.append(chBox, etiqRta);
            respuestasUl.append(rta);
            divItem.append(respuestasUl);
        }
        
        if (divItem) {       
            tarjeta.append(divItem);
        }
    }

    let form = document.querySelector('form');
    form.addEventListener('submit', ev => {
        evaluarCuestionario(items);
        ev.preventDefault();
    });
};

export { crearCuestionario }