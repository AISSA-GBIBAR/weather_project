data_location = {};
error_location = null;

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
						city =
							data.address.city || data.address.town || data.address.village;
						data_location["info"] = city;
						data_location["country"] = data.address.country;
						data_location["codeContry"] =
							data.address.country_code.toUpperCase();
					} else {
						error_location = "Could not retrieve the city name.";
					}
				})
				.catch((error) => {
					error_location = "Request error: ", error;
				});
		},
		(error) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					error_location = "The user declined the site request.";
				case error.POSITION_UNAVAILABLE:
					error_location = "The location is unavailable.";
				case error.TIMEOUT:
					error_location = "The site request has timed out.";
				default:
					error_location = "An unexpected error occurred.";
			}
		}
	);
} else {
	error_location = "Geolocation Not supported in this browser.";
}

if (error_location === null){
	console.log(data_location);
}else{
	console.log(error_location);
}