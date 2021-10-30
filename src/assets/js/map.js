(function(A) {

	if (!Array.prototype.forEach)
		A.forEach = A.forEach || function(action, that) {
			for (var i = 0, l = this.length; i < l; i++)
				if (i in this)
					action.call(that, this[i], i, this);
			};

		})(Array.prototype);

		var
		mapObject,
		markers = [],
		markersData = {
			'Marker': [
			{	
				location_latitude: 48.866024, 
				location_longitude: 2.340041,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-1.jpg',
				propertyprice: '$220',
				propertytype: 'For Rent',
				propertyname: 'Green Vally Resort',
				propertytime: 'mo'
			},
			{
				location_latitude: 48.868560,
				location_longitude: 2.349427,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-2.jpg',
				propertyprice: '$920',
				propertytype: 'For Sale',
				propertyname: 'Nestled Real Estate',
				propertytime: 'mo'
			},
			{
				location_latitude: 48.870824, 
				location_longitude: 2.333005,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-3.jpg',
				propertyprice: '$280',
				propertytype: 'For Rent',
				propertyname: 'Shipwright Realty',
				propertytime: 'mo'
			},
			{
				location_latitude: 48.864642,
				location_longitude: 2.345837,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-4.jpg',
				propertyprice: '$240',
				propertytype: 'For Rent',
				propertyname: 'Seekers Realty',
				propertytime: 'mo'
			},
			{
				location_latitude: 48.861753, 
				location_longitude: 2.338402,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-5.jpg',
				propertyprice: '$820',
				propertytype: 'For Sale',
				propertyname: 'Agile Real Estate Group',
				propertytime: 'mo'
			},
			{
				location_latitude: 48.872111,
				location_longitude: 2.345151,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-6.jpg',
				propertyprice: '$260',
				propertytype: 'For Rent',
				propertyname: 'Bluebell Real Estate',
				propertytime: 'mo'
			},
			
			{
				location_latitude: 48.865881, 
				location_longitude: 2.341507,
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-7.jpg',
				propertyprice: '$320',
				propertytype: 'For Rent',
				propertyname: 'Corsair Real Estate',
				propertytime: 'mo'
			},
			{
				location_latitude: 48.867236, 
				location_longitude: 2.343610, 
				locationURL: 'single-property-2.html',
				locationImg: 'assets/img/p-8.jpg',
				propertyprice: '$150',
				propertytype: 'For Sale',
				propertyname: 'Banyon Tree Realty',
				propertytime: 'mo'
			}
			
			]

		};

			var mapOptions = {
				zoom:15,
				center: new google.maps.LatLng(48.867236, 2.343610),
				mapTypeId: google.maps.MapTypeId.satellite,

				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_BOTTOM
				},
				scrollwheel: false,
				scaleControl: false,
				scaleControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				}
				
			};
			var marker;
			mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);
			for (var key in markersData)
				markersData[key].forEach(function (item) {
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
						map: mapObject,
						icon: 'assets/img/marker.png',
					});

					if ('undefined' === typeof markers[key])
						markers[key] = [];
					markers[key].push(marker);
					google.maps.event.addListener(marker, 'click', (function () {
				  closeInfoBox();
				  getInfoBox(item).open(mapObject, this);
				  mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
				 }));

	});

	new MarkerClusterer(mapObject, markers[key]);
	
		function hideAllMarkers () {
			for (var key in markers)
				markers[key].forEach(function (marker) {
					marker.setMap(null);
				});
		};
	
	

		function closeInfoBox() {
			$('div.infoBox').remove();
		};

		function getInfoBox(item) {
			return new InfoBox({
				content:'<div class="map-popup-wrap"><div class="map-popup"><div class="property-listing property-2"><div class="listing-img-wrapper"><div class="list-single-img"><a href="' + item.locationURL + '"><img src="' + item.locationImg + '" class="img-fluid mx-auto" alt="" /></a></div><span class="property-type">' + item.propertytype + '</span></div><div class="listing-detail-wrapper pb-0"><div class="listing-short-detail"><h4 class="listing-name"><a href="' + item.locationURL + '">' + item.propertyname + '</a><i class="list-status ti-check"></i></h4></div></div><div class="price-features-wrapper"><div class="listing-price-fx"><h6 class="listing-card-info-price price-prefix">' + item.propertyprice + '<span class="price-suffix">/' + item.propertytime + '</span></h6></div></div></div></div></div>',
				disableAutoPan: false,
				maxWidth: 0,
				pixelOffset: new google.maps.Size(10, 92),
				closeBoxMargin: '',
				closeBoxURL:'assets/img/close.png',
				isHidden: false,
				alignBottom: true,
				pane: 'floatPane',
				enableEventPropagation: true
			});
		};
		function onHtmlClick(location_type, key){
			 google.maps.event.trigger(markers[location_type][key], "click");
		}