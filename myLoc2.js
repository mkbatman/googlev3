//window.onload = getMyLocation mk;

var map;
var mymarker;
var devicemarker;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert("Oops, no geolocation support");
  }
}

function showPosition2(position){
	//alert("hi")
	var latLngNme = new google.maps.LatLng(Number(position.coords.latitude),Number(position.coords.longitude));
	devicemarker.setPosition(latLngNme)
}

function updateMarker(oldlatlng) {
	var div = document.getElementById("location");
	div.innerHTML = oldlatlng//"You are at Latitude: " + latLng.lat() + ", Longitude: " + latLng.lng();
	mymarker.setPosition(oldlatlng)
	//map.panTo(oldlatlng)
	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition2,showError);

}



//This function is inokved asynchronously by the HTML5 geolocation API.
function displayLocation(positionLL) {
  //The latitude and longitude values obtained from HTML 5 API.
  //var latitude = position.coords.latitude;
  //var longitude = position.coords.longitude;



  //Creating a new object for using latitude and longitude values with Google map.
	var latLng = positionLL; 
	showMap(latLng);	

  //addNearByPlaces(latLng);
	createMarker(latLng);
  
  /*var bounds = new google.maps.LatLngBounds();
  
  
	for(i=0;i<AllMArkers.length;i++) {
		bounds.extend(AllMArkers[i].getPosition());
	}
  */
  //Also setting the latitude and longitude values in another div.
  var div = document.getElementById("location");
  div.innerHTML = latLng//"You are at Latitude: " + latLng.lat() + ", Longitude: " + latLng.lng();
  //map.fitBounds(bounds);
}

function showMap(latLng) {
  //Setting up the map options like zoom level, map type.
  
  var newLL =  new google.maps.LatLng(51.6974059530879, -0.2972745895385742)
  
  var mapOptions = {
    center: newLL,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //Creating the Map instance and assigning the HTML div element to render it in.
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  
  var imageBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(51.683146345450695,-0.32418251037597656),
      new google.maps.LatLng(51.70793815111312, -0.28229713439941406));
	  
  busOverlay = new google.maps.GroundOverlay('http://squibl.com/nearlythere/troute-t.png',imageBounds);
  busOverlay.setMap(map);
  busOverlay.setOpacity(.2)
  //map.panTo(latLng)
}
var image1 = 'me1.png';

function createMarker(latLng) {
  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true,
	icon: image1
  }
  //Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(markerOptions);
  mymarker = marker
  AllMArkers[1] = mymarker

}

// Config for the javascript part

var urlForPHP 				= "getGEO.php";
var milsecondsTillRepeat 	= 1000;
var idForReplace			= "idForAJAXReplace";

function startRefreshing()
{
	setTimeout("startRefreshing()",milsecondsTillRepeat);
	reloadPHP();
}

/// the following code is based on http://www.w3schools.com/php/php_ajax_database.asp  but I shorted it quite some bit
var xmlhttp;

function reloadPHP()
{
	xmlhttp=GetXmlHttpObject();
	if (xmlhttp==null)
	{
		alert ("Your Browser does not support HTTP Request");
		return;
	}
	var url=urlForPHP;
	url=url+"?random="+Math.random();
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

var doonce = true;

function stateChanged()
{
	if (xmlhttp.readyState==4)
	{
	var l0 = xmlhttp.responseText.split("&")[2];
	var l1 = xmlhttp.responseText.split("&")[3];
	//.innerHTML=l0+":"+l1;
	var latLngN = new google.maps.LatLng(Number(l0),Number(l1));
	if (doonce) {doonce=false;getLocation();displayLocation(latLngN)}else{updateMarker(latLngN)}
	}
}

function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}


function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{}
  }
  
 var image2 = 'me2.png';
 var AllMArkers = [];
  
function showPosition(position)
  {
	var latLngNme = new google.maps.LatLng(Number(position.coords.latitude),Number(position.coords.longitude));
    var markerOptions = {
    position: latLngNme,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true,
	icon: image2
  }
  //Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(markerOptions);
  devicemarker = marker
  AllMArkers[0] = devicemarker
  }
  
var llocation = document.getElementById("location");
  
function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      llocation.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      llocation.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      llocation.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      llocation.innerHTML="An unknown error occurred."
      break;
    }
  }