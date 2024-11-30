function getLocation() {
	data_location = {};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				// console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
				const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						if (data.address) {
							city = data.address.city || data.address.town || data.address.village;
							data_location["info"] = city;
							data_location["country"] = data.address.country;
							data_location["codeContry"] = data.address.country_code.toUpperCase();
						} else {
							return "Could not retrieve the city name.";
						}
					})
					.catch((error) => {
						return "Request error: " + error; 
					});
			},
			(error) => {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						return "The user declined the site request.";
					case error.POSITION_UNAVAILABLE:
						return "The location is unavailable.";
					case error.TIMEOUT:
						return "The site request has timed out.";
					default:
						return "An unexpected error occurred.";
				}
			}
		);
	} else {
		return "Geolocation Not supported in this browser.";
	}

	return data_location;
}
mylocation = getLocation();
console.log(mylocation);

