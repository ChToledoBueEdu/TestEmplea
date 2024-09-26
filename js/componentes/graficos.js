import { descargar } from "./captura.js";

function graficar(items, total) {
    let options = {
        chart: {
          height: 280,
          type: "radialBar"
        },
        
        series: [Math.round((total/1900)*100)],
        
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%"
            },
           
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
      
        stroke: {
          lineCap: "round",
        },
        labels: ["Empleabilidad"]
      };
      
    cargarContenido(options, total);
}

async function cargarContenido(options, puntajeTotal) {
    let principal = document.querySelector('.contPpal');
    let docuHTML = await fetch("./resultado.html")
                            .then(respuesta => respuesta.text());
    principal.innerHTML = docuHTML;

    let data = await fetch("./data/PuntajeTotalTESTDEEMPLEABILIDAD.json")
                            .then(respuesta => respuesta.json());
    
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    let dev = document.querySelector('#salida');

    for (let d of data) {
        if (Number(d["Puntaje"]) <= puntajeTotal) {
            let p = document.createElement('p');
            p.className = 'marco';
            p.innerHTML = d["Texto"];
            dev.append(p);
            break;
        }
    }

    let capturar = document.getElementById('descarga');
    capturar.addEventListener('click', ev => {
        descargar('#captura');
    });
}

export { graficar }