window.onload = function() {
    // Loads data from the repo of the specified URL
    $('#get_data').click(function() {
        chart_router();
    });

    // Clears visible charts
    $('#clear_charts').click(function() {
        for (var i = 0; i < window.charts.length; i++) {
            window.charts[i].destroy();
        }
        window.charts = [];
        document.getElementById('chart_container').innerHTML = '';
    });
};

function chart_router() {
    chart_type = $('#chart_type').val();

    if (chart_type == 'all' || chart_type == 'commits') {
        load_commits_chart($('#repo_url').val());
    }
}
