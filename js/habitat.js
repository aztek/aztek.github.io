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

  const h1 = document.querySelector('h1');
  h1.setAttribute('data-content', places.length);
  h1.setAttribute('title', places.length + ' cities in ' + countries + ' countries');
}
var defaultMarkerIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
var activeMarkerIcon  = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var hoverZIndex = 1000000;
function pin(location, city, country) {
  const country_code = country.toLowerCase().replaceAll(' ', '-');

  const item = document.createElement('li');
  item.dataset.city = city;
  item.dataset.country = country;

  const citySpan = document.createElement('span');
  citySpan.className = 'city';
  citySpan.textContent = city;

  const countrySpan = document.createElement('span');
  countrySpan.className = 'country ' + country_code;
  countrySpan.textContent = country;

  item.append(citySpan, countrySpan);
  document.getElementById('list').appendChild(item);

  function placeMarker(location) {
    const icon = document.createElement('img');
    icon.src = defaultMarkerIcon;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: city + ", " + country,
      content: icon,
      gmpClickable: true
    });

    function highlight() {
      icon.src = activeMarkerIcon;
      marker.zIndex = hoverZIndex;
    }
    function unhighlight() {
      icon.src = defaultMarkerIcon;
      marker.zIndex = null;
    }

    icon.addEventListener('mouseover', function() {
      item.classList.add('active');
      highlight();
    });
    icon.addEventListener('mouseout', function() {
      item.classList.remove('active');
      unhighlight();
    });
    marker.addListener('click', function() {
      const container = document.getElementById('legend');
      container.scrollTop = item.offsetTop - (container.clientHeight - item.offsetHeight) / 2;
    });
    item.addEventListener('mouseover', highlight);
    item.addEventListener('click', function() {
      map.panTo(location);
    });
    item.addEventListener('mouseout', unhighlight);
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
