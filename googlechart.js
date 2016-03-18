google.charts.load('current', {packages: ['line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

  // Weight
  var weightTable = new google.visualization.DataTable();
  weightTable.addColumn('number', 'X');
  weightTable.addColumn('number', 'lbs');
  weightTable.addRows([
    [0, 60],
    [1, 60],
    [2, 60],
    [3, 60],
    [4, 62],
    [5, 64],
    [6, 64],
    [7, 64],
    [8, 64],
    [9, 66],
    [10, 66],
    [11, 66],
    [12, 66],
    [13, 66],
    [14, 66],
    [15, 68],
    [16, 68],
  ]);

  var weightOptions = {
    title: 'A3 Weight',
    hAxis: {
      title: 'Training Sessions'
    },
    vAxis: {
      title: 'Weight'
    }
  };

  var weightChart = new google.charts.Line(document.getElementById('weight_chart_div'));
  weightChart.draw(weightTable, weightOptions);

  // Time
  var timeTable = new google.visualization.DataTable();
  timeTable.addColumn('number', 'X');
  timeTable.addColumn('number', 'sec');
  timeTable.addRows([
    [0, 70],
    [1, 85],
    [2, 85],
    [3, 95],
    [4, 90],
    [5, 85],
    [6, 90],
    [7, 90],
    [8, 90],
    [9, 60],
    [10, 90],
    [11, 80],
    [12, 85],
    [13, 75],
    [14, 90],
    [15, 70],
    [16, 70],
  ]);

  var timeOptions = {
    title: 'A3 Time',
    colors: ['#f00'],
    hAxis: {
      title: 'Training Sessions'
    },
    vAxis: {
      title: 'Time'
    }
  };

  var timeChart = new google.charts.Line(document.getElementById('time_chart_div'));
  timeChart.draw(timeTable, timeOptions);
}
