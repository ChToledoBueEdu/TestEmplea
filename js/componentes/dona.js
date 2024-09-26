// Gráfico dona (o pie)
function crearDona(proporcion, total, etiqueta) {

    let options = {
        chart: {
            height: 280,
            type: "radialBar"
        },
        series: [Math.round((proporcion/total)*100)],
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
        labels: [etiqueta]
    };

    return options;
}

export { crearDona }