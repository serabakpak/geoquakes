// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {


	$.ajax({
		method: 'GET',
		url: weekly_quakes_endpoint,
		success: onSuccess,
		dataType: 'json'
	});


function onSuccess (json) {
	var source = $('#earthquake-list').html();
	var template = Handlebars.compile(source);
	var earthquakesHtml = template ({
		earthquakes: json.features
	});
	$('#info').append(earthquakesHtml);
}


});
