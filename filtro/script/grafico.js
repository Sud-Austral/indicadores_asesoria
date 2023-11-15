function generarChart2(dato, id) {
    //console.log(dato);
    // Datos del gráfico
    //console.log("dato",dato)
    var media = dato.data.filter(a => a != null).reduce((a, b) => a + b) / dato.data.filter(a => a != null).length;
    var minimo = Math.min(...dato.data.filter(a => a != null));
    var maximo = Math.max(...dato.data.filter(a => a != null));
    var data = {
        labels: dato.label,
        datasets: [{
            //label: ['Docentes en Aula'],
            data: dato.data,
            backgroundColor: [
                'orange', 'orange', 'orange', 'orange',
                'yellow', 'yellow', 'yellow', 'yellow',
                'red', 'red', 'red', 'red',
                'skyblue', 'skyblue', 'skyblue', 'skyblue',
                'purple', 'purple', 'purple', 'purple',
                'blue', 'blue', 'blue', 'blue', 'blue'
                // Añade más colores aquí para los datos restantes
            ],
            //borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
            borderWidth: 2 // Ancho del borde de las barras
        }]
    };
    var ctx2 = document.getElementById(id).getContext('2d');
    
    var myChart = new Chart(ctx2, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                annotation: {
                    annotations: [
                        {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: media,
                            borderColor: 'red', // Color de la línea de la media
                            borderWidth: 2, // Ancho de la línea de la media
                            label: {
                                enabled: true,
                                content: 'Media: ' + media.toFixed(2),
                                position: 'top'
                            }
                        },
                        {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: minimo,
                            borderColor: 'green', // Color de la línea del valor mínimo
                            borderWidth: 2, // Ancho de la línea del valor mínimo
                            label: {
                                enabled: true,
                                content: 'Media: ',
                                position: "center"
                            }
                        },
                        {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: maximo,
                            borderColor: 'blue', // Color de la línea del valor máximo
                            borderWidth: 2, // Ancho de la línea del valor máximo
                            label: {
                                enabled: true,
                                content: 'Media: ' + media.toFixed(2),
                                position: 'end'
                            }
                        }
                    ]
                },
                title: {
                    display: true,
                    text: dato.titulo,
                    font: {
                        weight: 'normal' // Establecer el peso de la fuente como normal (sin negrita)
                    }
                    //color: 'rgba(255, 0, 0, 1)' // Color del recuadro del título
                },
                legend: {
                    display: true,
                    //position:"bottom",
                    labels: {
                        generateLabels: function (chart) {
                            var labels = [];
                            labels.push({
                                text: 'Media',
                                fillStyle: 'red'
                            });
                            labels.push({
                                text: 'Mínimo',
                                fillStyle: 'green'
                            });
                            labels.push({
                                text: 'Máximo',
                                fillStyle: 'blue'
                            });
                            return labels;
                        }
                    }
                },
                /*
                legend: {
                    display: false,
                    labels: {
                        //color: 'rgba(255, 0, 0, 1)' // Color del recuadro al lado del label
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    },
                    boxBorderColor: 'rgba(255, 0, 0, 1)'
                },
                */
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    
                    formatter: function (value, context) {
                        return value; // Mostrar el valor de la barra como etiqueta
                    }
                    
                }
            },
            
            scales: {
                x: {
                    display: true, // Ocultar las líneas verticales
                    beginAtZero: true,
                    grid: {
                        display: false // Mostrar las líneas horizontales
                    },
                },
                y: {
                    beginAtZero: true, // Iniciar el eje y desde cero
                    title: {
                        display: true,
                        text: 'Eje Y' // Nombre del eje Y
                    },
                    grid: {
                        display: true // Mostrar las líneas horizontales
                    }
                }
            },
            tooltips: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFontColor: '#324234',
                bodyFontColor: '#fff',                
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
                
            }
        },
        plugins: [ChartDataLabels]
    });
    return myChart;
}

function calcularPromedio(datos) {
    let suma = 0;
    let cantidadElementos = 0;
    // Itera sobre cada elemento del array
    for (let i = 0; i < datos.length; i++) {
        // Verifica si el elemento es un número
        if (typeof datos[i] === 'number') {
            suma += datos[i];
            cantidadElementos++;
        }
    }
    // Calcula el promedio
    const promedio = suma / cantidadElementos;
    if (cantidadElementos == 0) {
        return null;
    }
    return promedio;
}
function generarMiniChart(dato, id) {
    var anio_2021 = calcularPromedio(dato.data.slice(20, 24).filter(a => a != null));
    var anio_2017 = calcularPromedio(dato.data.slice(16, 20).filter(a => a != null));
    var anio_2013 = calcularPromedio(dato.data.slice(12, 16).filter(a => a != null));
    var anio_2009 = calcularPromedio(dato.data.slice(8, 12).filter(a => a != null));
    var anio_2005 = calcularPromedio(dato.data.slice(4, 8).filter(a => a != null)  );
    
    var anio_2001 = calcularPromedio(dato.data.slice(0, 4).filter(a => a != null));
    var datos = {
        labels: ['2021-2024', '2017-2020', '2013-2016', '2009-2012', '2005-2008', '2001-2004'],
        datasets: [{
            label: `Frecuencia ${dato.titular}`,
            data: [anio_2021, anio_2017, anio_2013, anio_2009, anio_2005, anio_2001],
            //backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            backgroundColor: [
                "#0070C0",//'blue', 
                "#7030A0",//'purple', 
                "#00B0F0",//'skyblue',
                "#FF0000",//'red', 
                "#FFD966",//'yellow',
                "#ED7D31"//'orange'
                // Añade más colores aquí para los datos restantes
            ],
            //borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            //borderWidth: 1 // Ancho del borde de las barras
        }]
    };
    // Configuración del gráfico
    var configuracion = {
        indexAxis: 'y', // Mostrar el eje X de forma vertical
        responsive: true,
        maintainAspectRatio: false,
        height: 4000,
        scales: {
            x: {
                beginAtZero: true, // Iniciar el eje y desde cero
                title: {
                    display: false,
                    text: 'Eje Y' // Nombre del eje Y
                },
                grid: {
                    display: true // Mostrar las líneas horizontales
                },
            },
            y: {
                ticks: {
                    autoSkip: false // Evitar el salto automático de los labels
                },
                display: true, // Ocultar las líneas verticales
                beginAtZero: true,
                grid: {
                    display: false // Mostrar las líneas horizontales
                },                
            }
        },
        plugins: {
            title: {
                display: true,
                text: `${dato.titular} \nsegún periodo alcandicio`,
                font: {
                    weight: 'normal' // Establecer el peso de la fuente como normal (sin negrita)
                },
                //maxWidth: 2000,
                //color: 'rgba(255, 0, 0, 1)' // Color del recuadro del título
                //lineHeight: 1.2
            },
            tooltip: {
                enabled: false // Desactivar las etiquetas emergentes por defecto
            },
            legend: {
                display: false // Ocultar la leyenda
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                //offset: 54,
                formatter: function (value) {
                    return value; // Mostrar el valor numérico encima de cada columna
                }
            }
        }
    };

    // Crear el gráfico
    var contexto = document.getElementById(`${id}_2`).getContext('2d');
    new Chart(contexto, {
        type: 'bar', // Utilizar un gráfico de barras
        data: datos,
        options: configuracion,
        plugins: [ChartDataLabels]
    });
    return datos;
}

function generarRanking(resumen, invertido, id) {
    let alcalde = [
        { "periodo": "2021", "valor": resumen[0], "alcalde": "nombre2021" },
        { "periodo": "2017", "valor": resumen[1], "alcalde": "nombre2017" },
        { "periodo": "2013", "valor": resumen[2], "alcalde": "nombre2013" },
        { "periodo": "2009", "valor": resumen[3], "alcalde": "nombre2009" },
        { "periodo": "2005", "valor": resumen[4], "alcalde": "nombre2005" },
        { "periodo": "2001", "valor": resumen[5], "alcalde": "nombre2001" }
    ]
    /*
    alcalde = [
        { "periodo": "2021", "valor": 1, "alcalde": "nombre1" },
        { "periodo": "2017", "valor": 1, "alcalde": "nombre2" },
        { "periodo": "2013", "valor": 1, "alcalde": "nombre3" },
        { "periodo": "2009", "valor": -1, "alcalde": "nombre4" },
        { "periodo": "2005", "valor": 11, "alcalde": "nombre5" },
        { "periodo": "2001", "valor": 2, "alcalde": "nombre6" }
    ]
    */
    alcaldeNull = alcalde.filter(a => a.valor == null);
    alcalde = alcalde.filter(a => a.valor != null);
    
    let alcaldeOrdenado = alcalde.sort((a, b) => b.valor - a.valor);
    for (var i = 0; i < alcaldeOrdenado.length; i++) {
        alcaldeOrdenado[i].posicion = i + 1;
        if (i > 0 && alcaldeOrdenado[i - 1].valor == alcaldeOrdenado[i].valor) {
            alcaldeOrdenado[i].posicion = alcaldeOrdenado[i - 1].posicion
        }
    }

    if (invertido) {
        var maximo = Math.max(...alcaldeOrdenado.map(a => a.posicion));
        alcaldeOrdenado.forEach(a => a.posicion = maximo - a.posicion + 1);
    }
    for (var a = 1; a < 7; a++) {
        let filtro = a;
        let id_celda = `#ranking${a}_${id}`;
        let pueto_string = alcaldeOrdenado
            .filter(al => al.posicion == filtro)
            .map(al => al.alcalde)
            .join(" / ");
        $(id_celda).text(pueto_string)
        if (pueto_string == "") {
            $(id_celda).text("No Ranking")
        }
    }
    let id_celda = `#ranking7_${id}`;
    let pueto_string = alcaldeNull
        .map(al => al.alcalde)
        .join(" / ");
    $(id_celda).text(pueto_string)
    if (pueto_string == "") {
        $(id_celda).text("No Ranking")
    }
    return alcalde;

}

function getData(id) {
    url = `https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/${id}.json`;
    //console.log(url);
    $.get({
        url: url,
        //`Hola, mi nombre es ${nombre}, tengo ${edad} años y mido ${altura} metros.`
        error: () => console.log("No File in "),
        success: () => console.log("Conected..")
    })
        .done(
            data => {
                let datos = JSON.parse(data);
                //console.log(datos);
                $(`#${id}_label`).text(datos.titular);
                generarChart2(datos, id);
                let resumen = generarMiniChart(datos, id).datasets[0].data;
                let invertido = true;
                generarRanking(resumen, invertido, id)
        });
}


function generarChart(id) {
    getData();
    // Datos del gráfico
    var data = {
        labels: [2001
            , 2002
            , 2003
            , 2004
            , 2005
            , 2006
            , 2007
            , 2008
            , 2009
            , 2010
            , 2011
            , 2012
            , 2013
            , 2014
            , 2015
            , 2016
            , 2017
            , 2018
            , 2019
            , 2020
            , 2021
            , 2022
            , 2023
            , 2024],
        datasets: [{
            label: ['Docentes en Aula'],
            data: [2001
                , 2002
                , 2003
                , 2004
                , 2005
                , 2006
                , 2007
                , 2008
                , 2009
                , 2010
                , 2011
                , 2012
                , 2013
                , 2014
                , 2015
                , 2016
                , 2017
                , 2018
                , 2019
                , 2020
                , 2021
                , 2022
                , 2023
                , 2024],
            backgroundColor: [
                'orange', 'orange', 'orange', 'orange', 
                'yellow', 'yellow', 'yellow', 'yellow',
                'red', 'red', 'red', 'red',
                'skyblue', 'skyblue', 'skyblue', 'skyblue', 
                'purple', 'purple', 'purple', 'purple', 
                'blue', 'blue', 'blue', 'blue','blue'
                // Añade más colores aquí para los datos restantes
            ],
            //borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
            borderWidth: 2 // Ancho del borde de las barras
        }]
    };
    var ctx2 = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx2, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                
                title: {
                    display: true,
                    text: 'Docentes en Aula',
                    font: {
                        weight: 'normal' // Establecer el peso de la fuente como normal (sin negrita)
                    }
                   //color: 'rgba(255, 0, 0, 1)' // Color del recuadro del título
                },
                
                legend: {
                    display: false,
                    labels: {
                        //color: 'rgba(255, 0, 0, 1)' // Color del recuadro al lado del label
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    },
                    boxBorderColor: 'rgba(255, 0, 0, 1)'
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: function (value, context) {
                        return value; // Mostrar el valor de la barra como etiqueta
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true // Iniciar el eje y desde cero
                }
            }
        }
    });
    return myChart;
}



function getEchart(id, datos) {
    console.log(data);
    const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: "left",
        verticalAlign: "middle",
        rotate: 90,
        //formatter: '{c}  {name|{a}}',
        formatter: '{c} - Frecuencia',
        fontSize: 10,
        borderWidth: 10,
        textStyle: {
            //fontFamily: 'Arial, sans-serif', // Cambiar la fuente de la letra
            fontWeight: 'normal',
            //color:"black",
            //borderWidth: 10,// Cambiar el grosor de la letra
            //borderColor: 'red', // Color del borde de la letra en estado de énfasis
            //backgroundColor: 'yellow' // Color de fondo de la letra en estado de énfasis


        },
        rich: {
            name: {}
        }
    };
    var data = {
        categories: [2001
            , 2002
            , 2003
            , 2004
            , 2005
            , 2006
            , 2007
            , 2008
            , 2009
            , 2010
            , 2011
            , 2012
            , 2013
            , 2014
            , 2015
            , 2016
            , 2017
            , 2018
            , 2019
            , 2020
            , 2021
            , 2022
            , 2023
            , 2024],
        name: 'Frecuencia',
        values: [null
            , 2
            , 12003
            , 204
            , 505
            , -2006
            , 7
            , 8
            , 109
            , 610
            , 2511
            , 412
            , 4013
            , 14
            , 15
            , 12016
            , 2017
            , 18
            , 19
            , 220
            , 621
            , 822
            , 923
            , 22],
        colors: [
            'orange', 'orange', 'orange', 'orange',
            'yellow', 'yellow', 'yellow', 'yellow',
            'red', 'red', 'red', 'red',
            'skyblue', 'skyblue', 'skyblue', 'skyblue',
            'purple', 'purple', 'purple', 'purple',
            'blue', 'blue', 'blue', 'blue', 'blue'
            // Añade más colores aquí para los datos restantes
        ] // Colores personalizados para cada barra
    };

    // Configuración del gráfico
    var option = {
        title: {
            show: false,
            text: 'Ejemplo de gráfico de barras con padding',
            left: 'center',
            textStyle: {
                fontWeight: 'bold',
                left: 'center',
                // Estilos específicos para dispositivos móviles
                fontSize: '.81em',
            },
        },
        xAxis: {
            type: 'category',
            data: data.categories,
            axisTick: { show: false },
            axisLabel: {
                textStyle: {
                    fontSize: 10, // Tamaño de fuente
                    //color: 'red' // Color del texto
                    // Otros estilos de texto...
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    fontSize: 10, // Tamaño de fuente
                    //color: 'red' // Color del texto
                    // Otros estilos de texto...
                }
            }
        },
        series: [{
            //name: 'Frecuencia',
            type: 'bar',
            data: data.values,
            label: labelOption,
            itemStyle: {
                color: function (params) {
                    return data.colors[params.dataIndex]; // Obtener el color correspondiente a cada barra
                },
            }
        }, {
            name: 'Línea 1',
            type: 'line',
            data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
                1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
                1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000
            ], // Datos para la línea constante igual a 1
            lineStyle: {
                color: 'red', // Color de la línea
                width: 2 // Ancho de la línea
            }
        }, {
            name: 'Línea 2',
            type: 'line',
            data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000
            ], // Datos para la línea constante igual a 2
            lineStyle: {
                color: 'green', // Color de la línea
                width: 2 // Ancho de la línea
            }
        }, {
            name: 'Línea 3',
            type: 'line',
            data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000
            ],// Datos para la línea constante igual a 3
            lineStyle: {
                color: 'blue', // Color de la línea
                width: 2 // Ancho de la línea
            }
        }],
        legend: {
            data: ['Frecuencia', 'Línea 1', 'Línea 2', 'Línea 3'], // Etiquetas de la leyenda para cada línea
            left: 10,
            bottom: 10
        },
        tooltip: {
            trigger: 'axis', // Mostrar tooltip al interactuar con cualquier elemento del gráfico
            formatter: function (params) {
                var barValue = params[0].value; // Obtener el valor de la barra seleccionada
                var categoryValue = data.categories[params[0].dataIndex];
                if (typeof barValue === 'undefined') {
                    barValue = "S/I";
                }
                return 'Año: ' + categoryValue + '<br>Valor: ' + barValue;
            }
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            //left: 'right',
            //top: 'center',
            feature: {
                //mark: { show: true },
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { show: true, readOnly: false },
                //magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true },
                myToolboxFeatureSmallScreen: {
                    show: true,
                }
            }
        },
        grid: {
            left: '10%', // Ajusta el padding izquierdo
            right: '10%', // Ajusta el padding derecho
            //top: '10%', // Ajusta el padding superior
            //bottom: '10%', // Ajusta el padding inferior
        },
    };

    // Crear gráfico
    var chart = echarts.init(document.getElementById(id));
    //var chart2 = echarts.init(document.getElementById("a_"));
    chart.setOption(option);
    //chart2.setOption(option);
    //window.addEventListener('resize', function () {
    //    chart.resize();
    //});
}

function getEchart2(id, datos) {
    console.log(data);
    const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: "left",
        verticalAlign: "middle",
        rotate: 0,
        //formatter: '{c}  {name|{a}}',
        formatter: '{c}',
        fontSize: 10,
        borderWidth: 10,
        rich: {
            name: {}
        }
    };
    var data = {
        categories: [2001
            , 2002
            , 2003
            , 2004
            , 2005
            , 2006],
        name: 'Frecuencia',
        values: [10
            , 2
            , 20
            , 24
            , 0
            , -6
        ],
        colors: [
            'orange', 
            'yellow', 
            'red',    
            'skyblue',
            'purple', 
            'blue',   
            // Añade más colores aquí para los datos restantes
        ] // Colores personalizados para cada barra
    };

    // Configuración del gráfico
    var option = {
        title: {
            show: false,
            text: 'Ejemplo de gráfico de barras con padding',
            left: 'center',
            textStyle: {
                fontWeight: 'bold',
                left: 'center',
                // Estilos específicos para dispositivos móviles
                fontSize: '.41em',
            },
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    fontSize: 10, // Tamaño de fuente
                    //color: 'red' // Color del texto
                    // Otros estilos de texto...
                }
            }
        },
        yAxis: {
            type: 'category',
            data: data.categories,
            axisTick: { show: false },
            axisLabel: {
                textStyle: {
                    fontSize: 10, // Tamaño de fuente
                    //color: 'red' // Color del texto
                    // Otros estilos de texto...
                }
            }
        },
        series: [{
            //name: 'Frecuencia',
            type: 'bar',
            data: data.values,
            label: labelOption,
            itemStyle: {
                color: function (params) {
                    return data.colors[params.dataIndex]; // Obtener el color correspondiente a cada barra
                },
            }
        }],
        legend: {
            data: ['Frecuencia'], // Etiquetas de la leyenda para cada línea
            left: 10,
            bottom: 10
        },
        tooltip: {
            trigger: 'axis', // Mostrar tooltip al interactuar con cualquier elemento del gráfico
            formatter: function (params) {
                var barValue = params[0].value; // Obtener el valor de la barra seleccionada
                var categoryValue = data.categories[params[0].dataIndex];
                if (typeof barValue === 'undefined') {
                    barValue = "S/I";
                }
                return 'Año: ' + categoryValue + '<br>Valor: ' + barValue;
            }
        },
        toolbox: {
            itemSize: 10,
            show: true,
            //orient: 'vertical',
            left: 'left',
            //top: 'center',
            feature: {
                //mark: { show: true },
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { show: true, readOnly: false },
                //magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true },
                myToolboxFeatureSmallScreen: {
                    show: true,
                }
            }
        },
        grid: {
            left: '20%', // Ajusta el padding izquierdo
            //right: '10%', // Ajusta el padding derecho
            //top: '10%', // Ajusta el padding superior
            //bottom: '10%', // Ajusta el padding inferior
        },
    };

    // Crear gráfico
    //var chart = echarts.init(document.getElementById(id));
    var chart2 = echarts.init(document.getElementById("a_"));
    //chart.setOption(option);
    chart2.setOption(option);
    //window.addEventListener('resize', function () {
    //    chart.resize();
    //});
}

function getData2(id) {
    url = `https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/${id}.json`;
    //console.log(url);
    $.get({
        url: url,
        //`Hola, mi nombre es ${nombre}, tengo ${edad} años y mido ${altura} metros.`
        error: () => console.log("No File in "),
        success: () => console.log("Conected..")
    })
    .done(
    data => {
        let datos = JSON.parse(data);
        //console.log(datos);
        $(`#${id}_label`).text(datos.titular);
        getEchart(id, datos);
        getEchart2(id, datos)
            //generarChart2(datos, id);
            //let resumen = generarMiniChart(datos, id).datasets[0].data;
            //let invertido = true;
            //generarRanking(resumen, invertido, id)
        });
}



function redondearDecimal(numero, decimales) {
    var factor = Math.pow(10, decimales);
    return Math.round(numero * factor) / factor;
}
function separadorMiles(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatterSeparadorDecimal(numero) {
    let numeroCorregido = redondearDecimal(numero, 1);
    numeroCorregido = separadorMiles(numeroCorregido);
    let parteEntera = numeroCorregido.split(".")[0].replace(",", ".");
    let parteDecimal = numeroCorregido.split(".")[1];
    if (parteDecimal) {
        return parteEntera + "," + parteDecimal; 
    }
    return parteEntera + ",0";
    //return numeroCorregido.split(".")[0].replace(",",".") + "," + numeroCorregido.split(".")[1];
}





let contadorStickLeft = 1;
//Calcular Promedio de Datos anual
function calcularPromedio3(datos) {
    let suma = 0;
    let cantidadElementos = 0;
    // Itera sobre cada elemento del array
    for (let i = 0; i < datos.length; i++) {
        // Verifica si el elemento es un número
        if (typeof datos[i] === 'number') {
            suma += datos[i];
            cantidadElementos++;
        }
    }
    // Calcula el promedio
    const promedio = suma / cantidadElementos;
    if (cantidadElementos == 0) {
        return null;
    }
    return promedio;
}
//Obtener un array con los promedio de todos los periodos
function getArrayPromedio(dato) {
    var anio_2021 = calcularPromedio(dato.data.slice(20, 24).filter(a => a != null));
    var anio_2017 = calcularPromedio(dato.data.slice(16, 20).filter(a => a != null));
    var anio_2013 = calcularPromedio(dato.data.slice(12, 16).filter(a => a != null));
    var anio_2009 = calcularPromedio(dato.data.slice(8, 12).filter(a => a != null));
    var anio_2005 = calcularPromedio(dato.data.slice(4, 8).filter(a => a != null));
    var anio_2001 = calcularPromedio(dato.data.slice(0, 4).filter(a => a != null));
    return [anio_2021, anio_2017, anio_2013, anio_2009, anio_2005, anio_2001].reverse();
}
//Generar los gráficos
function echartContainer(id, datos) {
    datos.data = datos.data.reverse();
    let unidad = datos.unidad;
    var chartDom = document.getElementById(id);
    var chartDom2 = document.getElementById(`${id}_2`);

    var myChart = echarts.init(chartDom);
    var myChart2 = echarts.init(chartDom2);
    
    chartDom.style.margin = '0';
    chartDom.style.padding = '0';
    chartDom2.style.margin = '0';
    chartDom2.style.padding = '0';

    var anio = [2001
        , 2002
        , 2003
        , 2004
        , 2005
        , 2006
        , 2007
        , 2008
        , 2009
        , 2010
        , 2011
        , 2012
        , 2013
        , 2014
        , 2015
        , 2016
        , 2017
        , 2018
        , 2019
        , 2020
        , 2021
        , 2022
        , 2023
        , 2024].reverse();

    var colors = ['#C8E6EE', '#C8E6EE', '#C8E6EE', '#C8E6EE',
        '#A3D5E2', '#A3D5E2', '#A3D5E2', '#A3D5E2',
        '#76C0DB', '#76C0DB', '#76C0DB', '#76C0DB',
        '#4EA7CE', '#4EA7CE', '#4EA7CE', '#4EA7CE',
        '#2A8BC1', '#2A8BC1', '#2A8BC1', '#2A8BC1',
        '#216D97', '#216D97', '#216D97', '#216D97'];

    var colors2 = ['#C8E6EE','#A3D5E2', '#76C0DB', '#4EA7CE',
        '#2A8BC1', '#216D97'];

    var option;
    option = {
        title: {
            show: false,
            text: 'Promedio por Periodo Alcaldicio'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                // Obtener el nombre del punto de datos
                var label = params[0].name;
                // Obtener el valor de la serie
                var value = formatterSeparadorDecimal(params[0].value);

                // Personalizar el contenido del tooltip con estilos CSS
                var tooltipContent = '<div style="text-align: center;">' +
                    '<span style="font-weight: bold;">' + label + '</span><br/>' +
                    '<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color:' + params[0].color +';"></span>' +
                    '<span style="margin-left: 5px;">Frecuencia Media: ' + value + '</span>' +
                    '</div>';

                return tooltipContent;
            }
        },
        legend: {},
        grid: {
            left: '2',
            right: '10',
            top: '0',
            bottom: '5', // Utilizar el 100% del espacio del div contenedor
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: true,
                position: 'bottom', // Colocar las etiquetas en la parte inferior
                fontSize: 10 // Tamaño de fuente del eje X
            },
        },
        yAxis: {
            axisLabel: {
                show: false, // Oculta las etiquetas del eje Y
                position: 'bottom'
            },
            type: 'category',
            data: ['2021-2024', '2017-2020', '2013-2016', '2009-2012', '2005-2008', '2001-2004']
        },
        series: [
            {
                name: 'Frecuencia Media',
                type: 'bar',
                data: getArrayPromedio(datos),//[18203, 23489, 29034, 104970, 131744, 63023],
                itemStyle: {
                    color: function (params) {
                        return colors2[params.dataIndex]; // Obtener el color correspondiente a cada barra
                    },
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: (value) => `${formatterSeparadorDecimal(value.value)} [${unidad}]`,
                    padding: [0,0 , 0, 120],
                    /*
                    color: 'red',
                    fontSize: 12,
                    backgroundColor: 'lightgray', // Establece el color de fondo del label en gris claro
                    borderColor: 'black', // Establece el color del borde del label en negro
                    borderWidth: 1,
                    align: 'center', // Alinea el texto del label al centro
                    verticalAlign: 'middle', // Alinea verticalmente el texto del label al medio
                    padding: [5, 10, 5, 10], // Establece 5 píxeles de relleno en las direcciones superior e inferior, y 10 píxeles de relleno en las direcciones derecha e izquierda
                    rotate: 45,
                    */
                },
            }
        ],
        legend: {
            show: false,
            bottom: 0
        },
    };

    var option2;
    option2 = {
        title: {
            show: false,
            text: 'Evolución Anual'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '2',
            right: '10',
            top: '0',
            bottom: '5', // Utilizar el 100% del espacio del div contenedor
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: true,
                position: 'bottom', // Colocar las etiquetas en la parte inferior
                fontSize: 10 // Tamaño de fuente del eje X
            },
        },
        yAxis: {
            axisLabel: {
                show: true, // Oculta las etiquetas del eje Y
                position: 'bottom'
            },
            type: 'category',
            data: anio
        },
        series: [
            {
                name: 'Frecuencia',
                type: 'bar',
                data: datos.data,
                itemStyle: {
                    color: function (params) {
                        return colors[params.dataIndex]; // Obtener el color correspondiente a cada barra
                    },
                }
            }
        ],
        legend: {
            show: false,
            bottom: 0
        },
    };

    option && myChart.setOption(option);
    option2 && myChart2.setOption(option2);
}

function echartContainer2(id, datos) {
    datos.data = datos.data.reverse();
    let unidad = datos.unidad;
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom);

    var chartDom2 = document.getElementById(`${id}_2`);

    var myChart = echarts.init(chartDom);
    var myChart2 = echarts.init(chartDom2);

    chartDom.style.margin = '0';
    chartDom.style.padding = '0';
    chartDom2.style.margin = '0';
    chartDom2.style.padding = '0';

    var anio = [2001
        , 2002
        , 2003
        , 2004
        , 2005
        , 2006
        , 2007
        , 2008
        , 2009
        , 2010
        , 2011
        , 2012
        , 2013
        , 2014
        , 2015
        , 2016
        , 2017
        , 2018
        , 2019
        , 2020
        , 2021
        , 2022
        , 2023
        , 2024].reverse();

    var colors = ['#C8E6EE', '#C8E6EE', '#C8E6EE', '#C8E6EE',
        '#A3D5E2', '#A3D5E2', '#A3D5E2', '#A3D5E2',
        '#76C0DB', '#76C0DB', '#76C0DB', '#76C0DB',
        '#4EA7CE', '#4EA7CE', '#4EA7CE', '#4EA7CE',
        '#2A8BC1', '#2A8BC1', '#2A8BC1', '#2A8BC1',
        '#216D97', '#216D97', '#216D97', '#216D97'];    

    var colors2 = ['#C8E6EE', '#A3D5E2', '#76C0DB', '#4EA7CE',
        '#2A8BC1', '#216D97'];

    var option;
    option = {
        title: {
            show: false,
            text: 'Promedio por Periodo Alcaldicio'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                // Obtener el nombre del punto de datos
                var label = params[0].name;
                // Obtener el valor de la serie
                var value = formatterSeparadorDecimal(params[0].value);

                // Personalizar el contenido del tooltip con estilos CSS
                var tooltipContent = '<div style="text-align: center;">' +
                    '<span style="font-weight: bold;">' + label + '</span><br/>' +
                    '<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color:' + params[0].color + ';"></span>' +
                    '<span style="margin-left: 5px;">Frecuencia Media: ' + value + '</span>' +
                    '</div>';

                return tooltipContent;
            }
        },
        legend: {},
        grid: {
            left: '2',
            right: '10',
            top: '0',
            bottom: '5', // Utilizar el 100% del espacio del div contenedor
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: true,
                position: 'bottom', // Colocar las etiquetas en la parte inferior
                fontSize: 10 // Tamaño de fuente del eje X
            },
        },
        yAxis: {
            axisLabel: {
                show: false, // Oculta las etiquetas del eje Y
                position: 'bottom'
            },
            type: 'category',
            data: ['2021-2024', '2017-2020', '2013-2016', '2009-2012', '2005-2008', '2001-2004']
        },
        series: [
            {
                name: 'Frecuencia Media',
                type: 'bar',
                data: getArrayPromedio(datos),//[18203, 23489, 29034, 104970, 131744, 63023],
                itemStyle: {
                    color: function (params) {
                        return colors2[params.dataIndex]; // Obtener el color correspondiente a cada barra
                    },
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: (value) => `${formatterSeparadorDecimal(value.value)} [${unidad}]`,
                    padding: [0, 0, 0, 120],
                    /*
                    color: 'red',
                    fontSize: 12,
                    backgroundColor: 'lightgray', // Establece el color de fondo del label en gris claro
                    borderColor: 'black', // Establece el color del borde del label en negro
                    borderWidth: 1,
                    align: 'center', // Alinea el texto del label al centro
                    verticalAlign: 'middle', // Alinea verticalmente el texto del label al medio
                    padding: [5, 10, 5, 10], // Establece 5 píxeles de relleno en las direcciones superior e inferior, y 10 píxeles de relleno en las direcciones derecha e izquierda
                    rotate: 45,
                    */
                },
            }
        ],
        legend: {
            show: false,
            bottom: 0
        },
    };

    var option2;
    option2 = {
        title: {
            show: false,
            text: 'Evolución Anual'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '2',
            right: '10',
            top: '0',
            bottom: '5', // Utilizar el 100% del espacio del div contenedor
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: true,
                position: 'bottom', // Colocar las etiquetas en la parte inferior
                fontSize: 10 // Tamaño de fuente del eje X
            },
        },
        yAxis: {
            axisLabel: {
                show: true, // Oculta las etiquetas del eje Y
                position: 'bottom'
            },
            type: 'category',
            data: anio
        },
        series: [
            {
                name: 'Frecuencia',
                type: 'bar',
                data: datos.data,
                itemStyle: {
                    color: function (params) {
                        return colors[params.dataIndex]; // Obtener el color correspondiente a cada barra
                    },
                }
            }
        ],
        legend: {
            show: false,
            bottom: 0
        },
    };



    

    option && myChart.setOption(option);
    option2 && myChart2.setOption(option2);
    
}

//Esto solo genera los botones a la izquierda pero no los ordena
function addStickLeft(id, titulo, numeracion) {
    let contadorString = contadorStickLeft + "";
    if (contadorStickLeft < 10) {
        contadorString = `0${contadorString}`
    }
    //id = "Número recursos componen área Seguridad Municipio";
    let htmlString = `<li id="${numeracion}">` +
        `    <a href="#${id}_master">` +
        `        <h6> ${numeracion}</h6><p>${titulo}</p>` +
        '    </a></li>';
    contadorStickLeft++;
    $("#stick-left-id").append(htmlString)
}
//Genera titulos de los gráficos
function tituloGrafico(id, datos, numeracion) {
    let titulo1 = `#${id}_master_titulo1`;
    let titulo_sub = `#${id}_master_titulo_sub`;
    let contadorStickLeft2 = contadorStickLeft -1; 
    let contadorString = contadorStickLeft2 + "";
    if (contadorStickLeft2 < 10) {
        contadorString = `0${contadorString}`;
    }
    let titulo_completo = `${numeracion} ${datos.titulo_largo}    \u00a0     (${datos.unidad})    \u00a0   [Fuente: ${datos.Fuente}]`;
    let titulo_sub_completo = `${datos.area_tematica_completa}/ Subtema ${datos.tema}`;
    $(titulo1).text(titulo_completo);
    $(titulo_sub).text(titulo_sub_completo);
}
//Obtener datos y generar gráficos con títulos
function getData3(id, tema, codcom, numeracion) {
    let url = `https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/data/${tema}/${id}/${codcom}.json`;
    $.get({
        url: url,
        error: () => console.log("No File in "),
        //success: () => console.log("Conected..")
    })
    .done(data => {
        let datos = JSON.parse(data);
        //console.log(data)
        echartContainer(id, datos);
        addStickLeft(id, datos.titulo, numeracion);
        tituloGrafico(id, datos, numeracion);
        //cambiarColorStickLeft(););
    });
}
function getData4(id, tema, codcom, numeracion) {
    let url = `https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/data/${tema}/${id}/${codcom}.json`;
    $.get({
        url: url,
        error: () => console.log("No File in "),
        //success: () => console.log("Conected..")
    })
        .done(data => {
            let datos = JSON.parse(data);
            //console.log(data)
            //echartContainer(id, datos);
            echartContainer2(id, datos);
            addStickLeft(id, datos.titulo, numeracion);
            tituloGrafico(id, datos, numeracion);
            //cambiarColorStickLeft(););
        });
}



function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
} 

function cambiarColorStickLeft() {
    let clase = ".sticky-left li";
    var elementos = document.querySelectorAll(clase);
    let colores = ['#011F5E', '#036B99', '#04A6B2', '#4DB7AF',
        '#2A8BC1', '#216D97'];
    elementos.forEach(function (elemento, index) {
        if (index < 5) {
            elemento.style.backgroundColor = colores[0];
            return false;
        }
        if (index < 10) {
            elemento.style.backgroundColor = colores[1];
            return false;
        }
        if (index < 15) {
            elemento.style.backgroundColor = colores[2];
            return false;
        }
        elemento.style.backgroundColor = colores[3];
        return false;
        /*
        if (index < 20) {
            elemento.style.backgroundColor = colores[3];
            return false;
        }
        
        if (index < 25) {
            elemento.style.backgroundColor = colores[4];
            return false;
        }
        elemento.style.backgroundColor = colores[5];
        return false;
        */
    });
}

function toggleEducacion(clase) {
    let subitem = document.querySelector(`#${clase}`);
    if (subitem.classList.contains('visible')) {
        subitem.classList.remove('visible');
    } else {
        subitem.classList.add('visible');
    }  
};

function renderAlcaldes() {
    sessionStorage.removeItem('alcaldes');
    $.get({
        url: "https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/alcalde/data/13119.json",
        error: () => console.log("No File in "),
        success: () => console.log("Conected..")
    })
        .done(
            data => {
                sessionStorage.setItem('alcaldes', data);
                let datos = JSON.parse(data);
                $(document).ready(function () {
                    let index = 0;
                    for (anio of [2001, 2005, 2009, 2013, 2017, 2021]) {
                        $(`.alcaldeNombre${anio}`).each(function () {
                            $(this).text(datos[index].nombre);
                        });
                        $(`.partidoPolitico${anio}`).each(function () {
                            $(this).text(datos[index].partidoPolitico);
                        });
                        $(`.votacion${anio}`).each(function () {
                            $(this).text(datos[index].votacion);
                        });
                        index++;
                    }
                });
            });
}

function renderTema(codcom) {
$.get({
    url: "https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/referencia/referencia.json",
    error: () => console.log("No File in "),
    //success: () => console.log("Conected..")
})
.done(
    data => {
        let datos = JSON.parse(data);
        var areasUnicas = [...new Set(datos.map(item => item.area_name))].sort();
        areasUnicas.forEach(function (area) {
            let filterDatos = datos.filter(item => item.area_name == area);
            //console.log(filterDatos);
            let htmlString = `<p title="Haga Click aqui para ver los SubTemas de ${area}" onclick="toggleEducacion('${filterDatos[0].area_tematica}')" class="mt-3 mb-0 p-0 pointLabel" style="text-align: left;font-size:1.5em;">${area}</p>`
            let htmlStringAcumulado = ""
            
            filterDatos.forEach(function (item) {
                htmlStringAcumulado = `${htmlStringAcumulado} <a style="font-size:1.3em;" class="m-0 p-0 pl-1" href="/Home/Index?subtema=${item.tema2}&tema=${item.area_tematica}"><li>${item.Tema}</li></a>`
            });
            htmlStringAcumulado = `${htmlStringAcumulado} <a style="font-size:1.4em;" class="m-0 p-0 pl-1" href="/Home/ranking?tema=${filterDatos[0].area_tematica}&codcom=${codcom}">Ver Ranking de ${area}</a>`
            $("#tema_label_left").append(`${htmlString} <div class="transition" id="${filterDatos[0].area_tematica}">${htmlStringAcumulado}</div>`);
        })
        })
}

function renderTema2(codcom) {
    $.get({
        url: "https://raw.githubusercontent.com/Sud-Austral/grafico_comunal/main/referencia/referencia22.json",
        error: () => console.log("No File in "),
        //success: () => console.log("Conected..")
    })
        .done(
            data => {
                let datos = JSON.parse(data);
                console.log("render2",datos)
                var areasUnicas = [...new Set(datos.map(item => item.area_name))].sort();
                areasUnicas.forEach(function (area) {
                    let filterDatos = datos.filter(item => item.area_name == area);
                    //console.log(filterDatos);
                    let htmlString = `<p title="Haga Click aqui para ver los SubTemas de ${area}" onclick="toggleEducacion('${filterDatos[0].area_tematica}')" class="mt-3 mb-0 p-0 pointLabel" style="text-align: left;font-size:1.5em;">${area}</p>`
                    let htmlStringAcumulado = ""

                    filterDatos.forEach(function (item) {
                        htmlStringAcumulado = `${htmlStringAcumulado} <a style="font-size:1.3em;" class="m-0 p-0 pl-1" href="/Home/resumen?subtema=${item.tema2}&tema=${item.area_tematica}"><li>${item.Tema}</li></a>`
                    });
                    $("#tema_label_left").append(`${htmlString} <div class="transition" id="${filterDatos[0].area_tematica}">${htmlStringAcumulado}</div>`);
                })
            })
}


$(document).ready(function () {
    setTimeout(function () {
        renderAlcaldes();
    var ul = document.getElementById('stick-left-id');
    var lis = Array.from(ul.getElementsByTagName('li'));
    let colores = ['#011F5E', '#036B99', '#04A6B2', '#4DB7AF',
        '#2A8BC1', '#216D97'];
    lis.sort(function (a, b) {
        var idA = a.getAttribute('id');
        var idB = b.getAttribute('id');
        return idA.localeCompare(idB);
    });
    //console.log(lis)
    lis.forEach(function (li, index) {
        //console.log(index)
        ul.appendChild(li);
        if (index < 5) {
            li.style.backgroundColor = colores[0];
            return false;
        }
        if (index < 10) {
            li.style.backgroundColor = colores[1];
            return false;
        }
        if (index < 15) {
            li.style.backgroundColor = colores[2];
            return false;
        }
        li.style.backgroundColor = colores[3];
        return false;
        });
    }, 1000);
});

