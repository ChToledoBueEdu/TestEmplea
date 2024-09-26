// Gráfico radar
function crearRadar(etiquetas, valores) {

    let options = {
        chart: {
            height: 500,
            type: 'radar'
        },
        series: [
            {
                data: valores
            },
        ],
        yaxis: {
                max: 600,
                stepSize: 50,
        },
        plotOptions: {
            radar: {
                size: 250,
                offsetX: 0,
                offsetY: 50,
                polygons: {
                    strokeColors: '#e8e8e8',
                    strokeWidth: 1,
                    connectorColors: '#e8e8e8',
                }
            }
        },
        xaxis: {
            categories: etiquetas,
            labels: {
                show: true,
                style: {
                        colors: Array.from(etiquetas, (x) => '#153244')
                }
            }
        }
    }

    return options;
}

export { crearRadar }