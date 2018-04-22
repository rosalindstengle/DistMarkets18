function load_exchange_volume_chart(currency) {

    if (currency == '') {
        currency = "bitcoin";
    }

    jsonfile = $.getJSON("http://127.0.0.1:5000/volumes/" + currency + "?callback=?", function(data) {

        $.get(url, function (data) {
            console.log(data);
        });
        clean_exchange_volume_data(data);
    });
    if (jsonfile.status != 200) {
        init_exchange_volume_chart(undefined);
    }
    // var url = "http://127.0.0.1:5000/volumes/" + currency + "?callback=?";

    // $.get(url, function (data) {
    //     console.log(data);
    // // can use 'data' in here...
    // });

    console.log("load function");
}

function clean_exchange_volume_data(data) {
    console.log("clean data")
    var exchanges = [];
    var volumes = [];

    //json enters here!

    for (var i = 0; i < jsonfile.length; i++) {
        var temp_ex = exchanges[i];
        var temp_vol = volumes[i];

        exchanges.push(jsonfile.exchange);
        volumes.push(jsonfile.percentage);
    }

    console.log(jsonfile = " jsonfile")
    console.log(exchanges[1] + " exchagnes")

    /*exchanges = jsonfile.jsonarray.map(function(e) {
        return e.exchange;
    });
    volumes = jsonfile.jsonarray.map(function(e) {
        return e.volume;
    });; **/

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
    console.log('sample data running')
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

    console.log(data);

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
