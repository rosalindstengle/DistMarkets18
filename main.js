window.onload = function() {
    load_chart();

    $('#get_data').click(function() {
        repo_data = get_github_data($('#repo_url').value);
        load_chart(repo_data);
    });
};

function get_github_data(url) {
    return null;
}

function get_sample_data() {
    return {
        labels: ['Dev A', 'Dev B', 'Dev C', 'Dev D', 'Dev E'],
        datasets: [{
            label: 'Additions',
            backgroundColor: window.chartColors.green,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            label: 'Deletions',
            backgroundColor: window.chartColors.red,
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

function load_chart(data) {

    if (data == null) {
        data = get_sample_data()
    }

    var ctx = document.getElementById('canvas').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Developer Commits'
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
    });
}
