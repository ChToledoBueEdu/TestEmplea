import { graficar } from "./graficos.js";

function evaluarCuestionario() {
    let valores1 = document.querySelectorAll('input[type=radio]:checked');
    let valores2 = document.querySelectorAll('input[type=checkbox]:checked');
    let valores3 = document.querySelectorAll('option');
    
    let resultados = {}; 
    
    valores1.forEach(e => {
        let clase = e.className;
        if (clase in resultados) {
            resultados[clase] += Number(e.value);
        } else {
            resultados[clase] = Number(e.value);
        }
    });

    valores2.forEach(e => {
        let clase = e.className;
        if (clase in resultados) {
            resultados[clase] += Number(e.value);
        } else {
            resultados[clase] = Number(e.value);
        }
    });
    
    valores3.forEach(e => {
        if (e.selected) {
            let clase = e.className;
            if (clase in resultados) {
                resultados[clase] += Number(e.value);
            } else {
                resultados[clase] = Number(e.value);
            }
        }
    });
    
  
    
    graficar(resultados, true);
}

export { evaluarCuestionario }