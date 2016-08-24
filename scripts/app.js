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
		var myLatLng = {lat: 37.38, lng: -122.44};
		map = new google.maps.Map(document.getElementById('map'), {
								    	center: myLatLng,
								    	zoom: 8
									});
		for(var i = 0; i < json.features.length; i++){
			var markerLatLng = {
				lat: json.features[i].geometry.coordinates[1], 
				lng: json.features[i].geometry.coordinates[0]
			};
			var marker = new google.maps.Marker({
				position: markerLatLng,
				map: map,
				title: json.features[i].properties.title
			});
		}
	}





});
