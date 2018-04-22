function load_exchange_volume_chart(currency) {

    jsonfile = $.get("127.0.0.1:5000/volumes/" + currency);
    clean_exchange_volume_data(jsonfile);

    console.log("load function");
}

function clean_exchange_volume_data(data) {
    console.log("clean data")
    var exchanges = [];
    var volumes = [];
    
    //json enters here!
    exchanges = jsonfile.jsonarray.map(function(e) {
        return e.exchange;
    });
    volumes = jsonfile.jsonarray.map(function(e) {
        return e.volume;
    });;

    cleaned_data = {
        labels: exchanges,
        datasets: [{
            label: "Exchange Volume",
            backgroundColor: window.chartColors.blue,
            data: exchanges
        }]
    }

    init_exchange_volume_chart(cleaned_data);
 }

 function get_sample_exchange_volume_data() {
    return {
        labels: ['Exchange A', 'Exchange B', 'Exchange C'],
        datasets: [{
            label: "Volume",
            backgroundColor: window.chartColors.green,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]
    };
}

function init_exchange_volume_chart(data) {

    if (data == null) {
        data = get_sample_exchange_volume_data()
    }

    if (window.charts == undefined) {
        window.charts = []
    }

    var new_chart = document.createElement("canvas");
    var chart_container = document.getElementById("chart_container");
    var char_container = document.prepend(new_chart);
    windowcharts.push(new Chart(new_chart.getContext('2d'), {
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
                    stacked: true,
                }]
            }
        }
    }));
}

