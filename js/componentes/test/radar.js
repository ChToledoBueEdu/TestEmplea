// Gráfico radar
function crearRadar(etiquetas, valores) {

    let options = {
        chart: {
            width: "100%",
            height: 700,
            type: 'radar'
        },
        series: [
            {
                data: valores
            },
        ],
        yaxis: {
                max: 10,
                stepSize: 2,
        },
        plotOptions: {
            radar: {
                size: 250,
                offsetX: 0,
                offsetY: 0,
                polygons: {
                    strokeColors: '#e8e8e8',
                    strokeWidth: 1,
                    connectorColors: '#e8e8e8',
                    fill: {
                        colors: ['#f8f8f8', '#fff']
                    }
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
                    chart: {
                        height: 350
                    },
                    plotOptions: {
                        radar: {
                            size: 100
                        }
                    },
                }
            }
        ]
    }

    return options;
}

export { crearRadar }