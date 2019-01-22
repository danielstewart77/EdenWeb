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

function moistGauge(DivId, value, label){
    c3.generate({
        bindto: DivId,
        data: {
            columns: [
            [label + ' Moisture', value]
            ],
            type: 'gauge',
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    return Math.round(value * 100) /100;
                },
                show: true // min/max labels.
            },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 10, // 100 is default
        units: '',
        width: 39 // for adjusting arc thickness
        },
        color: {
            // lightgreen: #90EE90
            // darker?green: #71c571
            // green: #008000
            // blue: #0000FF
            // red: #FF0000
            // darkorange: #F97600
            pattern: [ '#FF0000', '#08e108', '#0000FF'], // the three color levels for the percentage values.
            threshold: {
            //unit: 'value', // percentage is default
            //max: 10, // 100 is default
                values: [ 3.5, 6.5, 10]
            }
        },
    });
}