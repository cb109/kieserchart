var kieserchart = (function() {
  'use strict';

  // Input file-pick triggers parsing + drawing.
  $(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
  });

  function handleFileSelect(evt) {
    var file = evt.target.files[0];
    parseCSV(file);
  }

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

  function transform(parsed) {
    // Collect column headers.
    var columnHeaders = [];
    var firstRow = parsed.data[0];
    Object.keys(firstRow).forEach(function(key, index) {
      // Collect only lbs, not sec.
      var invalid = key.indexOf("sec") > -1;
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

  function Value(x, y) {
    this.x = x;
    this.y = y;
  }

  function DataLine(key, values) {
    this.key = key;
    this.values = values;
    // this.area = true;
  }

  function drawGraph(valueLines) {
    var dateFormat = "DD.MM.YYYY";

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
