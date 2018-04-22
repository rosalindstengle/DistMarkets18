function load_exchange_volume_chart(currency) {

    if (currency == '') {
        currency = "bitcoin";
    }

    $.getJSON("http://127.0.0.1:5000/volumes/" + currency, function(data) {
        clean_exchange_volume_data(data);
    });
}

function clean_exchange_volume_data(data) {
    var exchanges = [];
    var volumes = [];

    console.log(data);

    for (var i = 0; i < data['volumes'].length; i++) {
        exchanges.push(data['volumes'][i].exchange + '-' + data['volumes'][i].pair);
        volumes.push(data['volumes'][i].percentage);
    }

    cleaned_data = {
        labels: exchanges,
        datasets: [{
            label: "Exchange Volume",
            backgroundColor: window.chartColors.blue,
            data: volumes
        }]
    }

    init_exchange_volume_chart(cleaned_data);
 }

function get_sample_volumes_data() {
    console.log('sample data running');
    return {
        labels: ['Exchange A', 'Exchange B', 'Exchange C', 'Exchange D', 'Exchange E'],
        datasets: [{
            label: 'Portion of total trading volume',
            backgroundColor: window.chartColors.blue,
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

function init_exchange_volume_chart(data) {

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
                text: 'Volume by Exchange'
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
