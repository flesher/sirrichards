var map;
var pos;
var geocoder;
var marker;
var MY_MAPTYPE_ID = 'custom_style';

function initialize() {
  var featureOpts = [
    {
      stylers: [
        { "invert_lightness": true },
        { "saturation": 23 },
        { "hue": "#7e3f98" }
      ]
    }
  ];
  
  var mapOptions = {
    zoom: 15,
    center: pos,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID,
    scrollwheel: false
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
      
  geocoder = new google.maps.Geocoder();

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      var infowindow = new google.maps.InfoWindow();
      var latlng = new google.maps.LatLng(pos.lb, pos.mb);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            map.setZoom(14);
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            infowindow.setContent(results[1].formatted_address);
            infowindow.open(map, marker);
          }
        } else {
          alert("Geocoder failed due to: " + status);
        }
      });
      
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);