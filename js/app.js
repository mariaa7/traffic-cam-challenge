// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

var markers = [];
var map;

$(document).ready(function() {

	var mapOptions = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	}

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var infoWindow = new google.maps.InfoWindow();

	//Adds markers to map
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			console.log('success!');
			$.each(data, function(i, item) {
				var latLng = new google.maps.LatLng(item.location.latitude, item.location.longitude);	
				var marker = new google.maps.Marker({
	    			position: latLng,
	    			map: map,
	    			label: item.cameralabel,
	    			imgSrc: item.imageurl.url
				});
				markers.push(marker);
				google.maps.event.addListener(marker, 'click', markerClick)
			});
		})
		.fail(function(error) {
			alert('Your request has failed');
		})
		.always(function() {
		
		});

	//Pans to marker and opens infowindow when marker is clicked
	function markerClick() {
		map.panTo(this.getPosition());
		var contentString = '<p>' + this.label + '</p><img src=' + 
		this.imgSrc + '>';
		infoWindow.setContent(contentString);
		infoWindow.open(map, this);
	}

	

});

//Filters markers shown on map by search input
$('#search').bind("search keyup", function() {
		var searchTerm = document.getElementById('search').value.toLowerCase();
		$.each(markers, function(index, value) {
			var markerLabel = value.label.toLowerCase();
			if (markerLabel.indexOf(searchTerm) == -1) {
				value.setMap(null);
			} else {
				value.setMap(map);
			}
		});
});









