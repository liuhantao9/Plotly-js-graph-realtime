// load google charts library
google.load("visualization", "1.1", {packages:['corechart', 'controls']});

// for percentage data
var dashboard, data, chart, options;

var i = 0;

google.setOnLoadCallback(drawChart);

/* initialize chart1 - rest, walk, fast_walk data */
function drawChart() {
    var dashboard = new google.visualization.Dashboard(
      document.getElementById('dashboard'));

    var control = new google.visualization.ControlWrapper({
        'controlType': 'ChartRangeFilter',
        'containerId': 'control',
        'options': {
        // Filter by the date axis.
        'filterColumnIndex': 0,
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'chartArea': {'width': '90%'},
            'hAxis': {'baselineColor': 'none'}
          }
        }
        }
        // Initial range: 2012-02-09 to 2012-03-20.
        'state': {'range': {'start': 0 'end': 10}}
        });

    var chart = new google.visualization.ChartWrapper({
        'chartType': 'CandlestickChart',
        'containerId': 'chart',
        'options': {
        // Use the same chart area width as the control for axis alignment.
            'chartArea': {'height': '80%', 'width': '90%'},
            'hAxis': {'slantedText': false},
            'vAxis': {'viewWindow': {'min': 0, 'max': 100}},
            'legend': {'position': 'none'}
        },
    });

    var data = new google.visualization.DataTable();
    data.addColumn('count', 'Count');
    data.addColumn('percent', 'Percentage');
    data.addRow([
        '0',
        0
    ]);

    // var chart = new google.visualization.LineChart(document.getElementById('data-container'));
    // chart.draw(data, options);
    dashboard.bind(control, chart);
    dashboard.draw(data);
    // return(dashboard);
}

/* update the chart1 - percentage data */
function updateChart(percentage) {
    i = (i + 1);

    data.addRow([
        ""+i,
        percentage
    ]);

    chart.draw(data, options);
}

$(function() {
    chart = drawChart();
});


/* reset charts */
function reset(){
    i = 0;

    data = google.visualization.arrayToDataTable([
        ['Time', 'percentage'],
        ['0', 0],
    ]);

    chart = drawChart(data);
}
