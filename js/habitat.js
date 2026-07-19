var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  const canvas = document.getElementById('map');
  const options = {
    center: new google.maps.LatLng(57, 38),
    zoom: 4,
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    panControl: false,
    mapId: "map",
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DEFAULT,
      position: google.maps.ControlPosition.LEFT_TOP
    },
    streetViewControl: false,
  }
  map = new google.maps.Map(canvas, options);

  // Sort by city name
  places.sort((a, b) => a[1].localeCompare(b[1]));

  for (const [position, city, country] of places) {
    pin(position, city, country);
  }
  const countries = new Set(places.map(p => p[2])).size;

  $('h1')
    .attr('data-content', places.length)
    .attr('title', places.length + ' cities in ' + countries + ' countries');
}
var defaultMarkerIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
var activeMarkerIcon  = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
function pin(location, city, country) {
  const country_code = country.toLowerCase().replaceAll(' ', '-');
  const item = $('<li id="' + city + '"><span class="city">' + city + '</span><span class="country ' + country_code + '">' + country + '</span></li>');
  $('#list').append(item);
  function placeMarker(location) {
    const marker = new google.maps.Marker({
      map: map,
      position: location,
      title: city + ", " + country,
      icon: defaultMarkerIcon
    });
    const zIndex = marker.getZIndex();
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
      const container = $('#legend');
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
    return marker;
  }
  if (location === undefined) {
    geocoder.geocode({address: city, region: country}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        const geocoded = results[0].geometry.location;
        placeMarker(geocoded);
        console.log('[new google.maps.LatLng' + geocoded.toString() + ', "' + city + '", "' + country + '"],');
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  } else {
    placeMarker(location);
  }
}
