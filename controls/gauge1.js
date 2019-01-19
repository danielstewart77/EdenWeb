function drawGauge(DivId, Label, Value) {

    var data = google.visualization.arrayToDataTable([
        ["Label", "Value"],
        [Label, Value]
    ]);

    var view = new google.visualization.DataView(data);

    var options = {
            redFrom: 0, redTo: 3.5,
            greenFrom: 3.5, greenTo: 6.5,
            yellowFrom: 6.5, yellowTo: 10,
            yellowColor: '#0000FF',
            min: 0,
            max: 10
        };

    var chart = new google.visualization.Gauge(document.getElementById(DivId));
    chart.draw(view, options);
}