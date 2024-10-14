// Gráfico radar
function crearRadar(etiquetas, valores) {

    let options = {
        chart: {
            width: "100%",
            height: 550,
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
                size: 230,
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
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    plotOptions: {
                        radar: {
                            size: 150
                        }
                    },
                }
            }
        ]
    }

    return options;
}

export { crearRadar }