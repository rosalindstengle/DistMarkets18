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

    // Changes fields based on chart type
    $('#chart_type').change(function() {
        $('.query').addClass('hidden');
        if ($(this).val() == 'all' || $(this).val() == 'commits') {
            $('#repo_url').removeClass('hidden');
        }
        if ($(this).val() == 'all' || $(this).val() == 'exchange_volume') {
            $('#currency').removeClass('hidden');
        }
        if ($(this).val() == 'all' || $(this).val() == 'addresses') {
            $('#network').removeClass('hidden');
        }
        if ($(this).val() == 'all' || $(this).val() == 'miners') {
            $('#network').removeClass('hidden');
        }
    });
};

function chart_router() {
    chart_type = $('#chart_type').val();

    if (chart_type == 'all' || chart_type == 'commits') {
        load_commits_chart($('#repo_url').val());
    }
    if (chart_type == 'all' || chart_type == 'exchange_volume') {
        load_exchange_volume_chart($('#currency').val());
    }
    if (chart_type == 'all' || chart_type == 'addresses') {
        load_address_charts($('#network').val());
    }
    if (chart_type == 'all' || chart_type == 'miners') {
        load_miners_charts($('#network').val());
    }
}
