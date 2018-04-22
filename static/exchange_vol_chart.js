function load_exchange_volume_chart(currency) {

    if (currency == '') {
        currency = "bitcoin";
    }

    $.getJSON("http://127.0.0.1:5000/volumes/" + currency, function(data) {
        clean_exchange_volume_data(currency, data);
    });
}

function clean_exchange_volume_data(currency, data) {
    var exchanges = [];
    var volumes = [];

    data['volumes'].sort(function(a, b) {
        return a.percentage - b.percentage;
    });

    for (var i = 0; i < data['volumes'].length; i++) {
        exchanges.push(data['volumes'][i].exchange + ' - ' + data['volumes'][i].pair);
        volumes.push(data['volumes'][i].percentage);
    }

    cleaned_data = {
        labels: exchanges,
        datasets: [{
            label: "Exchange Volume",
            backgroundColor: Object.values(window.chartColors)[window.colorCount],
            data: volumes
        }]
    }

    init_exchange_volume_chart(currency, cleaned_data);
 }

function get_sample_volumes_data() {
    console.log('sample data running');
    return {
        labels: ['Exchange A', 'Exchange B', 'Exchange C', 'Exchange D', 'Exchange E'],
        datasets: [{
            label: 'Portion of total trading volume',
            backgroundColor: Object.values(window.chartColors)[window.colorCount],
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]
    };
}

function init_exchange_volume_chart(currency, data) {

    if (data == undefined) {
        data = get_sample_volumes_data();
    }

    if (window.charts == undefined) {
        window.charts = []
    }

    var new_chart = document.createElement("canvas");
    var chart_container = document.getElementById("chart_container");
    chart_container.prepend(new_chart);
    window.charts.push(new Chart(new_chart.getContext('2d'), {
        type: 'bar',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Volume by Exchange - ' + currency
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    }));
}
