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

  var places = [
    [new google.maps.LatLng(37.4947611, 139.9298096), "Aizuwakamatsu", "Japan"],
    [new google.maps.LatLng(38.994349, -1.858542400000033), "Albacete", "Spain"],
    [new google.maps.LatLng(39.191786, -1.4295773000000054), "Alcalá del Júcar", "Spain"],
    [new google.maps.LatLng(52.3702157, 4.895167899999933), "Amsterdam", "The Netherlands"],
    [new google.maps.LatLng(44.8857008, 37.31991909999999), "Anapa", "Russia"],
    [new google.maps.LatLng(57.72103500000001, 12.939818999999943), "Boras", "Sweden"],
    [new google.maps.LatLng(48.1458923, 17.107137299999977), "Bratislava", "Slovakia"],
    [new google.maps.LatLng(50.8503396, 4.351710300000036), "Brussels", "Belgium"],
    [new google.maps.LatLng(39.2578708, -1.3330644999999777), "Casas de Ves", "Spain"],
    [new google.maps.LatLng(56.15, 47.233333000000016), "Cheboksary", "Russia"],
    [new google.maps.LatLng(35.7346813, 140.82664060000002), "Choshi", "Japan"],
    [new google.maps.LatLng(55.6760968, 12.568337100000008), "Copenhagen", "Denmark"],
    [new google.maps.LatLng(41.2107299, 13.571428500000025), "Gaeta", "Italy"],
    [new google.maps.LatLng(57.70887, 11.974559999999997), "Gothenburg", "Sweden"],
    [new google.maps.LatLng(53.5510846, 9.99368179999999), "Hamburg", "Germany"],
    [new google.maps.LatLng(60.17332440000001, 24.941024800000037), "Helsinki", "Finland"],
    [new google.maps.LatLng(58.6978588, 59.49290369999994), "Kachkanar", "Russia"],
    [new google.maps.LatLng(55.790278, 49.13472200000001), "Kazan", "Russia"],
    [new google.maps.LatLng(50.4501, 30.523400000000038), "Kiev", "Ukraine"],
    [new google.maps.LatLng(58.6035321, 49.66679829999998), "Kirov", "Russia"],
    [new google.maps.LatLng(35.0116363, 135.76802939999993), "Kyoto", "Japan"],
    [new google.maps.LatLng(53.8007554, -1.5490773999999874), "Leeds", "United Kingdom"],
    [new google.maps.LatLng(48.30694, 14.285830000000033), "Linz", "Austria"],
    [new google.maps.LatLng(53.4083714, -2.9915726000000404), "Liverpool", "United Kingdom"],
    [new google.maps.LatLng(49.61162100000001, 6.131934600000022), "Luxembourg City", "Luxembourg"],
    [new google.maps.LatLng(59.9138688, 10.752245399999993), "Oslo", "Norway"],
    [new google.maps.LatLng(51.5073509, -0.12775829999998223), "London", "United Kingdom"],
    [new google.maps.LatLng(53.4807593, -2.2426305000000184), "Manchester", "United Kingdom"],
    [new google.maps.LatLng(55.755826, 37.6173), "Moscow", "Russia"],
    [new google.maps.LatLng(48.1351253, 11.581980599999952), "Munich", "Germany"],
    [new google.maps.LatLng(55.7185054, 52.37210379999999), "Naberezhnye Chelny", "Russia"],
    [new google.maps.LatLng(40.8539855, 14.2466023), "Naples", "Italy"],
    [new google.maps.LatLng(57.4902781, 60.212086099999965), "Nevyansk", "Russia"],
    [new google.maps.LatLng(40.7127837, -74.00594130000002), "New York", "USA"],
    [new google.maps.LatLng(57.9214912, 59.98161860000005), "Nizhny Tagil", "Russia"],
    [new google.maps.LatLng(48.856614, 2.3522219000000177), "Paris", "France"],
    [new google.maps.LatLng(59.883333, 29.899999999999977), "Peterhof", "Russia"],
    [new google.maps.LatLng(40.7466196, 14.4936821), "Pompei", "Italy"],
    [new google.maps.LatLng(50.0755381, 14.43780049999998), "Prague", "Czech Republic"],
    [new google.maps.LatLng(41.9027835, 12.496365500000024), "Rome", "Italy"],
    [new google.maps.LatLng(44.952117, 34.10241700000006), "Simferopol", "Ukraine"],
    [new google.maps.LatLng(43.585278, 39.72027800000001), "Sochi", "Russia"],
    [new google.maps.LatLng(59.6572649, 30.9450984), "St. Petersburg", "Russia"],
    [new google.maps.LatLng(59.32932349999999, 18.068580800000063), "Stockholm", "Sweden"],
    [new google.maps.LatLng(45.759722, 21.230000000000018), "Timisoara", "Romania"],
    [new google.maps.LatLng(35.6894875, 139.69170639999993), "Tokyo", "Japan"],
    [new google.maps.LatLng(59.85856380000001, 17.638926699999956), "Uppsala", "Sweden"],
    [new google.maps.LatLng(57.107118, 12.252090700000053), "Varberg", "Sweden"],
    [new google.maps.LatLng(58.86666700000001, 60.799999999999955), "Verkhoturye", "Russia"],
    [new google.maps.LatLng(48.2081743, 16.37381890000006), "Vienna", "Austria"],
    [new google.maps.LatLng(56.83892609999999, 60.60570250000001), "Yekaterinburg", "Russia"],
    [new google.maps.LatLng(45.19045, 33.36686699999996), "Yevpatoriya", "Ukraine"],
    [new google.maps.LatLng(38.9071923, -77.03687070000001), "Washington DC", "USA"],
    [new google.maps.LatLng(53.95996510000001, -1.0872979000000669), "York", "United Kingdom"],
  ];

  for (var i = 0; i < places.length; i++) {
    var position = places[i][0];
    var city = places[i][1];
    var country = places[i][2];
    pin(position, city, country);
  }
}
defaultMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
activeMarkerIcon  = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
function pin(location, city, country) {
  var item = $('<li>' + city + ", " + country + '</li>');
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
      var container = $('#list');
      container.scrollTop(item.offset().top - container.offset().top + container.scrollTop());
    });
    marker.addListener('mouseout', function() {
      item.removeClass('active');
      marker.setIcon(defaultMarkerIcon);
      marker.setZIndex(zIndex);
    });
    item.mouseover(function() {
      marker.setIcon(activeMarkerIcon);
      marker.setZIndex(google.maps.Marker.MAX_ZINDEX);
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
      if (status == google.maps.GeocoderStatus.OK) {
        var location = results[0].geometry.location;
        placeMarker(location);
        console.log('[new google.maps.LatLng(' + (location.A || location.J) + ', ' + (location.F || location.M) + '), "' + city + '", "' + country + '"],');
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
google.maps.event.addDomListener(window, 'load', initialize);
