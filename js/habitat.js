var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var canvas = document.getElementById('map');
  var options = {
    center: new google.maps.LatLng(57, 38),
    zoom: 4,
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    panControl: false,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DEFAULT,
      position: google.maps.ControlPosition.LEFT_TOP
    },
    streetViewControl: false,
  }
  map = new google.maps.Map(canvas, options);

  for (var i = 0; i < places.length; i++) {
    var position = places[i][0];
    var city = places[i][1];
    var country = places[i][2];
    pin(position, city, country);
  }
}
defaultMarkerIcon = '//maps.google.com/mapfiles/ms/icons/red-dot.png';
activeMarkerIcon  = '//maps.google.com/mapfiles/ms/icons/blue-dot.png';
function pin(location, city, country) {
  var item = $('<li id="' + city + '">' + city + ", " + country + '</li>');
  $('#list').append(item);
  function placeMarker(location) {
    var marker = new google.maps.Marker({
      map: map,
      position: location,
      title: city + ", " + country,
      icon: defaultMarkerIcon
    });
    var zIndex = marker.getZIndex();
    marker.addListener('mouseover', function() {
      item.addClass('active');
      marker.setIcon(activeMarkerIcon);
      marker.setZIndex(google.maps.Marker.MAX_ZINDEX);
    });
    marker.addListener('mouseout', function() {
      item.removeClass('active');
      marker.setIcon(defaultMarkerIcon);
      marker.setZIndex(zIndex);
    });
    marker.addListener('click', function() {
      var container = $('#legend');
      container.scrollTop(item.offset().top + container.scrollTop() - (container.height() - item.height()) / 2);
    });
    item.mouseover(function() {
      marker.setIcon(activeMarkerIcon);
      marker.setZIndex(google.maps.Marker.MAX_ZINDEX);
    });
    item.click(function() {
      map.panTo(location);
    });
    item.mouseout(function() {
      marker.setIcon(defaultMarkerIcon);
      marker.setZIndex(zIndex);
    });
    item.click(function() {
      map.panTo(location);
    });
    return marker;
  }
  if (location === undefined) {
    geocoder.geocode({address: city, region: country}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var location = results[0].geometry.location;
        placeMarker(location);
        console.log('[new google.maps.LatLng' + location.toString() + ', "' + city + '", "' + country + '"],');
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  } else {
    placeMarker(location);
  }
}
function getItem(city, country) {
  return $("#list li[data-city='" + city + "'][data-country='" + country + "']").next();
}
