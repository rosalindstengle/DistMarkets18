window.onload = function() {
    load_chart();

    $('#get_data').click(function() {
        repo_data = get_github_data($('#repo_url').val());
    });
};

function get_github_data(url) {
    // Parse URL - we need username and repo name
    // https://github.com/<username>/<repo>
    var username = url.split('/')[3];
    var repo_name = url.split('/')[4];

    // api.github.com/repos/:owner/:repo/stats/contributors
    $.get("https://api.github.com/repos/" + username + "/" + repo_name + "/stats/contributors", clean_data);
}

function clean_data(repo_data) {
    // console.log(repo_data);

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

    load_chart(cleaned_data);
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

    if (window.myBar) {
        window.myBar.destroy();
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
