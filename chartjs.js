var data = {
  labels: [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
  ],
  datasets: [
   {
      label: "A3 Time",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [
        70,
        85,
        85,
        95,
        90,
        85,
        90,
        90,
        90,
        60,
        90,
        80,
        85,
        75,
        90,
        70,
        70,
      ]
    },
    {
      label: "A3 Weight",
      fillColor: "rgba(220,0,0,0.2)",
      strokeColor: "rgba(220,0,0,1)",
      pointColor: "rgba(220,0,0,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,0,0,1)",
      data: [
        60,
        60,
        60,
        60,
        62,
        64,
        64,
        64,
        64,
        66,
        66,
        66,
        66,
        66,
        66,
        68,
        68,
      ]
    },
  ]
};

var options = {
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};

var ctx = document.getElementById("myChart").getContext("2d");
var myLineChart = new Chart(ctx).Line(data, options);
document.getElementById("myChartLegend").innerHTML = myLineChart.generateLegend();