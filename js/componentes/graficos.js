import { descargar } from "./captura.js";
import { crearDona } from "./dona.js";
import { crearRadar } from "./radar.js";

async function graficar(items, total) {
    // Cambio de contenido en página
    let principal = document.querySelector('.contPpal');
    let docuHTML = await fetch("./resultado.html")
                            .then(respuesta => respuesta.text());
    principal.innerHTML = docuHTML;

    // Empleabilidad
    let data1 = await fetch("./data/PuntajeTotalTESTDEEMPLEABILIDAD.json")
                            .then(respuesta => respuesta.json());
    let maxPuntaje = 0;
    for (let d of data1) {
        if (Number(d["Puntaje"]) > maxPuntaje) maxPuntaje = Number(d["Puntaje"]);
    }
  
    let chart1 = new ApexCharts(
        document.querySelector("#chart1"), 
        crearDona(total, maxPuntaje, 'Empleabilidad')
    );
    chart1.render();  
    let dev1 = document.querySelector('#salida1');
    
    for (let d of data1) {
        if (total <= Number(d["Puntaje"])) {
            let p = document.createElement('p');
            p.className = 'marco';
            p.innerHTML = d["Texto"];
            dev1.append(p);
            break;
        }
    }
    
    // Aspecto evaluados
    let data2 = await fetch("./data/empleabilidadPorItem.json")
                            .then(respuesta => respuesta.json());
    
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
    let etiquetasRadar = [];
    resPorItem.forEach(valor => {
        valoresResItems.push(Object.values(valor)[0][1]);
        etiquetasRadar.push(Object.keys(valor)[0]);
    });
    
    let chart2 = new ApexCharts(
        document.querySelector("#chart2"), 
        crearRadar(etiquetasRadar, valoresResItems)
    );
    chart2.render();  
    
    let dev2 = document.querySelector('#salida2');
    resPorItem.forEach(valor =>{
        let div = document.createElement('div');
        div.className = 'marco';
        let item = document.createElement('h3');
        item.innerHTML = Object.keys(valor)[0]
        let p = document.createElement('p');
        p.innerHTML = Object.values(valor)[0][0]
        div.append(item, p);
        dev2.append(div);
    });

    // Descarga de resultados
    let capturar = document.getElementById('descarga');
    capturar.addEventListener('click', ev => {
        descargar('#captura');
    });
}

export { graficar }