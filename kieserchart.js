var kieserchart = (function() {
  'use strict';

  var dateFormat = "DD.MM.YYYY";

  /* Input file-pick triggers parsing and drawing. */
  $(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
  });

  /* Let the user pick a file when the button is pressed. */
  function handleFileSelect(evt) {
    var file = evt.target.files[0];
    parseCSV(file);
  }

  /* Parse the given .csv file into a list of objects.
   *
   * Each object represents a row, with each column header
   * as a key and the respective cell content as a value.
   */
  function parseCSV(csvFile) {
    var config = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function(results) {
        var parsed = results;
        transform(parsed)
      }
    };
    Papa.parse(csvFile, config);
  }

  /* Transform the parsed CSV data into a representation for the chart.
   *
   * The chart expects a certain data schema; this is wrapped in Value
   * and DataLine objects here. The date column is parsed and later used
   * to inject dates into each data row, so it can be display on the
   * x-axis.
   */
  function transform(parsed) {
    // Collect column headers.
    var columnHeaders = [];
    var firstRow = parsed.data[0];
    Object.keys(firstRow).forEach(function(key, index) {
      // Collect only lbs, not sec.
      var invalid = key.indexOf('sec') > -1;
      if (!invalid) {
        columnHeaders.push(key);
      }
    });
    var rows = parsed.data;

    // For each column, collect values.
    var lines = [];
    columnHeaders.forEach(function(columnName, columnIdx) {
      var values = [];
      rows.forEach(function(row, rowIdx) {
        var x = rowIdx;
        var y = row[columnName] || null; //interpolate(rows, rowIdx, columnName);
        var value = new Value(x, y);
        values.push(value);
      });
      var line = new DataLine(columnName, values);
      lines.push(line);
    });

    var dateLine = lines[0];
    var valueLines = lines.slice(1, lines.length);

    // Now substitute x values in valueLines with actual date strings.
    valueLines.forEach(function (valueLine) {
      valueLine.values.forEach(function (valueObj) {
        var dateString = dateLine.values[valueObj.x].y;
        valueObj.x = dateString;
      });
    });

    drawGraph(valueLines);
  }

  /* A chart data sample. */
  function Value(x, y) {
    this.x = x;
    this.y = y;
  }

  /* A data line for the chart.
   *
   * The values list holds Value objects.
   */
  function DataLine(key, values) {
    this.key = key;
    this.values = values;
    // this.area = true;
  }

  /* Construct and draw the nv3d chart */
  function drawGraph(valueLines) {
    nv.addGraph(function() {
      var chart = nv.models.lineChart()
        .margin({left: 50, right: 50, top: 50})
        .useInteractiveGuideline(true)
        .x(function(valueObj) {
          var date = moment(valueObj.x, dateFormat)._d;
          return date;
        });

      chart.xScale(d3.time.scale());
      chart.xAxis
        .axisLabel('Trainings')
        .tickFormat(function(dateNumber) {
            var date = new Date(dateNumber);
            return d3.time.format('%d.%m.%y')(date);
        });

      chart.yAxis
        .axisLabel('Weight or Time')
        .tickFormat(d3.format(',r'));

      d3.select('#chart svg')
        .datum(valueLines)
        .transition().duration(500)
        .call(chart);

      nv.utils.windowResize(chart.update);
      return chart;
    });
  }

})();
