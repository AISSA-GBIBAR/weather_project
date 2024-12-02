const getLocationData = async () => {
  let data_location = {};
  let error_location = null;

  if (!navigator.geolocation) {
    error_location = "Geolocation is not supported in this browser.";
    return error_location; // Return immediately if geolocation is unsupported
  }

  try {
    // Wait for geolocation to get the position
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Build the API URL
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      // Fetch data from the API
      const response = await fetch(url);
      const data = await response.json();

      if (data.address) {
        const city = data.address.city || data.address.town || data.address.village;
        data_location["info"] = city;
        data_location["country"] = data.address.country;
        data_location["codeContry"] = data.address.country_code.toUpperCase();
      } else {
        error_location = "Could not retrieve the city name.";
      }
    } catch (fetchError) {
      error_location = "Error fetching location data: " + fetchError.message;
    }
  } catch (geoError) {
    // Handle geolocation errors
    switch (geoError.code) {
      case geoError.PERMISSION_DENIED:
        error_location = "The user declined the site request.";
        break;
      case geoError.POSITION_UNAVAILABLE:
        error_location = "The location is unavailable.";
        break;
      case geoError.TIMEOUT:
        error_location = "The site request has timed out.";
        break;
      default:
        error_location = "An unexpected error occurred.";
    }
  }

  // Return data_location if populated, otherwise error_location
  return Object.keys(data_location).length > 0 ? data_location : error_location;
};

let nameCityCountry = document.querySelector(".nameCityCountry");
// Call the function using async/await
(async () => {
  const result = await getLocationData();
  if (typeof result === "object" && result !== null){
    const formatCityCountry = `${result.info}, ${result.codeContry}`;
    nameCityCountry.innerHTML = formatCityCountry;
  }
})();


