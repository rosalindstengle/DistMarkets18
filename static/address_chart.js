function load_address_charts(url) {

    get_sample_address_data();

    /**
    if (url == '') {
        url = 'https://github.com/bitcoin/bitcoin';
    }

    // Parse URL - we need username and repo name
    // https://github.com/<username>/<repo>
    var username = url.split('/')[3];
    var repo_name = url.split('/')[4];

    // api.github.com/repos/:owner/:repo/stats/contributors
    $.get("https://api.github.com/repos/" + username + "/" + repo_name + "/stats/contributors", clean_commits_data);
    **/
}

function clean_address_data(repo_data) {
    var labels = [];
    var commits = [];
    for (var i = 0; i < repo_data.length; i++) {
        labels.push(repo_data[i].author.login);
        commits.push(repo_data[i].total);
    }

    cleaned_data = {
        labels: labels,
        datasets: [{
            label: 'Commits',
            backgroundColor: window.chartColors.blue,
            data: commits
        }]
    }

    init_commits_chart(cleaned_data);
}

function get_sample_address_data() {
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

function init_address_chart(data) {

    if (data == null) {
        data = get_sample_address_data()
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
                text: 'Address Ownership'
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
