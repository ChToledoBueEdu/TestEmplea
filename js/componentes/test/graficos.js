import { descargar } from "../captura.js";
import { crearDona } from "./dona.js";
import { crearRadar } from "./radar.js";
import { crear } from "../conexion/conectar.js"
import { quitarAcentosEnClaves } from "../auxiliar/letras.js";

async function graficar(items, crearTest) {

    // Correción de claves
    if (!crearTest) {

        for (let d in items) {
            let aux = d.charAt(0).toUpperCase() + d.slice(1);
            items[aux] = items[d];
            delete items[d];
        }
        
        for (let d in items) {
            if (d === 'Tecnicas') {
                items['Técnicas'] = items[d];
                delete items[d]
            }
        }
    }

    // Cambio de contenido en página
    let principal = document.querySelector('.contPpal');
    let docuHTML = await fetch("./site/resultado.html")
                            .then(respuesta => respuesta.text());
    principal.innerHTML = docuHTML;

    // Empleabilidad
    // Cálculo del total
    let sumaTotal = 0;
    Object.keys(items).forEach(e => {
        if (!Number.isNaN(Number(items[e]))) sumaTotal += Number(items[e]);
    });

    let data1 = await fetch("./data/puntajeTotal.json")
                            .then(respuesta => respuesta.json());
    let maxPuntaje = 0;
    for (let d of data1) {
        if (Number(d["puntaje"]) > maxPuntaje) maxPuntaje = Number(d["puntaje"]);
    }
  
    let chart1 = new ApexCharts(
        document.querySelector("#chart1"), 
        crearDona(sumaTotal, maxPuntaje, 'Empleabilidad')
    );
    chart1.render();  
    let dev1 = document.querySelector('#salida1');
    
    for (let d of data1) {
        if (sumaTotal <= Number(d["puntaje"])) {
            let div = document.createElement('div');
            div.className = 'marco';
            let p = document.createElement('p');
            p.innerHTML = d["devolucion"];
            div.append(p);
            dev1.append(div);
            break;
        }
    }
    
    // Aspecto evaluados
    let data2 = await fetch("./data/empleabilidadPorItem.json")
                            .then(respuesta => respuesta.json());
    let etiquetasRadar = [];
    data2.forEach(d => {
        if (!etiquetasRadar.includes(d["Tipo"])) {
            etiquetasRadar.push(d["Tipo"]);
        };
    });

    // Si es la primera vez que lo realiza
    if (crearTest) {

        // Modificación para campo "otras"
        let otras = 0;
        Object.keys(items).forEach(e => {
            if (!(etiquetasRadar.includes(e)) && !Number.isNaN(Number(resultados[e]))) {
                otras += Number(items[e]);
                delete items[e];
            }
        });
        items.otras = otras;
    } else {

    }

    etiquetasRadar.forEach(e => {
        if (!(Object.keys(items).includes(e))) {
            items[e] = 0;
        }
    });
    
    let resPorItem = [];
    for (let i in items) {
        for (let res of data2) {
            if (i == res["Tipo"] && i <= res) {
                resPorItem.push({[i]: [res["Devolucion"], items[i]]});
                break;
            }
        }
    }

    let valoresResItems = [];
    resPorItem.forEach(valor => {
        valoresResItems.push(Object.values(valor)[0][1]);
    });
    
    // Obtener valores máximos para cada item
    let maxPuntajeItem = [];
    etiquetasRadar.forEach(e => {
        let max = 0;
        data2.forEach(d => {
            if (e == d["Tipo"] && Number(d["Puntaje"]) > max) {
                    max = Number(d["Puntaje"]);
                };
        });
        maxPuntajeItem.push(max);
    });

    // Escalado de valores para radar
    for (let i = 0; i < maxPuntajeItem.length; i++) {
        let aux = ((valoresResItems[i]/maxPuntajeItem[i]) * 10).toFixed(2);
        valoresResItems[i] = aux;
    }
    
    let chart2 = new ApexCharts(
        document.querySelector("#responsive-chart"), 
        crearRadar(etiquetasRadar, valoresResItems)
    );
    chart2.render();  
    
    let dev2 = document.querySelector('#salida2');
    resPorItem.forEach(valor =>{
        let div = document.createElement('div');
        div.className = 'marco';
        let item = document.createElement('h3');
        item.innerHTML = 'Habilidades ' + Object.keys(valor)[0]
        let p = document.createElement('p');
        p.innerHTML = Object.values(valor)[0][0]
        div.append(item, p);
        dev2.append(div);
    });

    if (crearTest) {
        // Envío al back
        let tk = sessionStorage.getItem('tk');
        let id_dcript = sessionStorage.getItem('id_dcript');
        let hoy = new Date();
        let fecha_test = `${hoy.getFullYear()}-${hoy.getMonth()+1}-${hoy.getDate()}`;
        let origRes = quitarAcentosEnClaves(items);
        
        let envio = {}
        envio.id_dcript = id_dcript;
        envio.fecha_test = fecha_test;
        
        for (let clave in origRes) {
            let conversion = clave.toLowerCase();
            envio[conversion] = origRes[clave];
        }

        // let urlTest = 'https://chtolecac.pythonanywhere.com/test/';
        let urlTest = 'http://127.0.0.1:8000/test/';
        crear(tk, urlTest, envio);
    }

    // Descarga de resultados
    let capturar = document.getElementById('descarga');
    capturar.addEventListener('click', ev => {
        descargar('#captura');
    });
}

export { graficar }