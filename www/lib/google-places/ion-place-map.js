placeTools
  .directive('ionGooglePlaceMap', ['$timeout', function ($timeout) {
  	return {
  		restrict: 'E',
  		template: [
  			'<div class="ion-place-tools-map-holder" ng-class="{ \'visible\': visible }">',
  				'<div class="ion-place-tools-map-wrapper">',
	  				'<div class="ion-place-tools-map"></div>',
	  				'<div class="autocomplete-wrap">',
	  					'<ion-google-place radius="options.radius" placeholder="Your address" location-changed="locationChanged" ng-model="data.address" required name="address"/>',
	  				'</div>',
	  				'<div class="controls">',
	  					'<button type="button" class="button button-stable" ng-click="hideModal()">Cancel</button>',
	  					'&nbsp;',
	  					'<button type="button" class="button button-positive" ng-click="callSuccess()">OK</button>',
	  				'</div>',
	  			'</div>',
  			'</div>'
  		].join(''),
  		scope: {
        visible: '=',
        data: '=',
        options: '=',
        onSuccess: '&'
      },
  		replace: true,
  		link: function (scope, element, attrs) {
  			options = angular.extend({
  				radius: 15000,
  				fitBounds: true,
  				marker: true
  			}, scope.options);

  			var mapEl = element.find('div')[0].children[0],
  				mapProp = {
				    center: new google.maps.LatLng(51.508742,-0.120850),
				    zoom: 5,
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  },
			  	map = new google.maps.Map(mapEl, mapProp),
			  	geocoder = new google.maps.Geocoder(),
			  	marker = new google.maps.Marker({
			  		position: mapProp.center,
			  		map: map,
			  		draggable: true
			  	});

			  if (!options.marker) {
			  	marker.setVisible(false);
			  }

			  scope.hideModal = function () {
			  	scope.visible = false;
			  };

			  scope.callSuccess = function () {
			  	scope.hideModal();
			  	if (scope.onSuccess) {
            scope.onSuccess()();
          }
			  };

			  scope.locationChanged = function (address) {
					geocoder.geocode({
					  address: address
					}, function(results, status) {
					  if (status == google.maps.GeocoderStatus.OK) {
					  	scope.data.latitude = results[0].geometry.location.lat();
			  			scope.data.longitude = results[0].geometry.location.lng();
					    map.setCenter(results[0].geometry.location);
					    marker.setPosition(results[0].geometry.location);
					    if (options.fitBounds) {
					    	map.fitBounds(results[0].geometry.viewport);
					    }
					  }
					});
			  };

			  var geoCodeByCoords = function (latLng) {
			  	geocoder.geocode({
			  		latLng: latLng
			  	}, function (results, status) {
			  		if (status == google.maps.GeocoderStatus.OK) {
			  			scope.data.address = results[0].formatted_address;
			  			scope.data.latitude = results[0].geometry.location.lat();
			  			scope.data.longitude = results[0].geometry.location.lng();
			  			scope.$apply();
			  			map.setCenter(results[0].geometry.location);
			  			marker.setPosition(results[0].geometry.location);
			  			if (options.fitBounds) {
					    	map.fitBounds(results[0].geometry.viewport);
					    }
			  		}
			  	});
			  };

			  google.maps.event.addListener(map, 'dragend', function() {
			  	geoCodeByCoords(map.getCenter());
			  });

			  var infoWindow = null;

			  google.maps.event.addListener(map, 'click', function (ev) {
			  	geocoder.geocode({
			  		latLng: ev.latLng
			  	}, function (results, status) {
			  		if (status == google.maps.GeocoderStatus.OK) {
			  			if (infoWindow) {
			  				infoWindow.close();
			  			}
				  		infoWindow = new google.maps.InfoWindow({
		            content: results[0].formatted_address,
		            position: ev.latLng
		          });
		          infoWindow.open(map);
				  	}
			  	});
			  });

			  google.maps.event.addListener(marker, 'dragend', function () {
      		geoCodeByCoords(marker.getPosition());
      	});

			  navigator.geolocation.getCurrentPosition(function (position) {
          latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          geoCodeByCoords(latLng);
        });

        scope.$watch('options.marker', function(val) {
			  	options.marker = val;
			  	marker.setVisible(options.marker);
			  });
  		}
  	};
  }]);