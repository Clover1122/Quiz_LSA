//uczl203---the following code is adapted from Claire Ellul Practical-week5
//https://github.com/claireellul/cegeg077-week5app/blob/master/ucfscde/www/js/appActivity.js

//add the variables
var earthquakelayer;
// a global variable to hold the http request
var client;
// store the map
var mymap;

var testMarkerRed = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'
});

var testMarkerPink = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});

// this is the code that runs when the App starts

	loadMap();
	//showPointLineCircle();
		
// ***********************************
// the functions

function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
	// draw a point on the map
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
		.bindPopup("<b>You are at "+ position.coords.latitude + " "+position.coords.longitude+"!</b>");
	
	// draw circle surrounded the point
	L.circle([position.coords.latitude, position.coords.longitude], 10, {
		color: 'blue',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap);
	// show the latlog in the html
	document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}
    // Show Warrent Street Location
	L.marker([51.516, -0.1451]).addTo(mymap).bindPopup("<b>Warrent St. Station</b>").openPopup();

function loadMap(){
		mymap = L.map('mapid').setView([51.505, -0.09], 13);
			// load the tiles
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);

}

function getDistance() {
	alert('getting distance');
	// getDistanceFromPoint is the function called once the distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}


function getDistanceFromPoint(position) {
	// find the coordinates of a point using this website: 
	// these are the coordinates for Warren Street
	var lat = 51.524616;
	var lng = -0.13818;
	// return the distance in kilometers
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
	document.getElementById('showDistance').innerHTML = "Distance: " + distance;
}

//distance calculation-- the following code is adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        subAngle = Math.acos(subAngle)
        subAngle = subAngle * 180/Math.PI  // convert the degree value returned by acos back to degrees from radians
        dist = (subAngle/360) * 2 * Math.PI * 3956; //     ((subtended angle in degrees)/360) * 2 * pi * radius where radius is 3956 miles
        if (unit=="K") { dist = dist * 1.609344 } // convert miles to km
        if (unit=="N") { dist = dist * 0.8684 } // convert miles to nautical miles
        return dist
}


// define the global variable to process the AJAX request
var xhr; 
function callDivChange() {
	xhr = new XMLHttpRequest();
	var filename = document.getElementById("filename").value;
	xhr.open("GET", filename, true);
	xhr.onreadystatechange = processDivChange;
	try {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
	// this only works in internet explorer
	}
	xhr.send();
}

function processDivChange() {
if (xhr.readyState < 4) // while waiting response from server
	document.getElementById('button1').innerHTML = "Loading...";
else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
	if (xhr.status == 200 && xhr.status < 300)
	// http status between 200 to 299 are all successful
	document.getElementById('button1').innerHTML = xhr.responseText;
}
}

  	function showPointLineCircle(){
			// add a point
			L.marker([51.5, -0.09]).addTo(mymap)
			.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
	        // add a circle
            L.circle([51.508, -0.11], 500, {
            	color: 'red',
            	fillColor: '#f03',
            	fillOpacity: 0.5
            }).addTo(mymap).bindPopup("I am a circle.");
	        // add a polygon with 3 end points (i.e. a triangle)
            var myPolygon = L.polygon([
            	[51.509, -0.08],
            	[51.503, -0.06],
            	[51.51, -0.047]
            	],{
            		color: 'red',
            		fillColor: '#f03',
            		fillOpacity: 0.5
            	}).addTo(mymap).bindPopup("I am a polygon.");
        }