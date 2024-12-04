function fetchWeather(Namecity, date = "") {
	keyApi = "96a6054d329c413bbc1121945240311";
	let urlApi;
	if (date == "") {
		urlApi = `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${Namecity} &aqi=no`;
	} else {
		urlApi = `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${Namecity} &dt=${date}`;
	}

	let tempC = document.querySelector(".tempC");
	let precipitation = document.querySelector(".precipitation .value");
	let humid = document.querySelector(".humidity .value");
	let wind = document.querySelector(".wind .value");
	let iconTemp = document.querySelector(".icon-temp");
	let desc = document.querySelector(".desc");
	let icon = document.querySelector(".image-weather");

	fetch(urlApi)
		.then((response) => response.json())
		.then((infoWeather) => {
			let temp_C = infoWeather.current.temp_c;
			temp_C = temp_C < 10 ? "0"+temp_C : temp_C;
			const humidity = infoWeather.current.humidity;
			const wind_kph = infoWeather.current.wind_kph;
			const precip_mm = infoWeather.current.precip_mm;
			const is_day = infoWeather.current.is_day;
			const uv = infoWeather.current.uv;

			tempC.innerHTML = temp_C;
			precipitation.innerHTML = precip_mm + " mm";
			humid.innerHTML = humidity + " %";
			wind.innerHTML = wind_kph + " km/h";

			if (temp_C > 35 && is_day == 1 && uv > 3) {
				iconTemp.innerHTML = '<i class="bi bi-thermometer-sun redIcon"></i>';
                desc.innerHTML = "Heat";
			} else if (temp_C > 35 && is_day == 1) {
				iconTemp.innerHTML = '<i class="bi bi-thermometer-high redIcon"></i>';
                desc.innerHTML = "Moderate";
			} else if (temp_C > 15 && temp_C < 25) {
				iconTemp.innerHTML = '<i class="bi bi-thermometer-half"></i>';
                desc.innerHTML = "Moderate";
			} else if (temp_C > 0 && temp_C < 15) {
				iconTemp.innerHTML = '<i class="bi bi-thermometer-low"></i>';
				desc.innerHTML = "Cold";
			} else if (temp_C < 0) {
				iconTemp.innerHTML = '<i class="bi bi-thermometer"></i>';
				desc.innerHTML = "too cold";
			} else if (temp_C < 0 && temp_C < 15 && precip_mm > 0) {
				iconTemp.innerHTML = '<i class="bi bi-thermometer-snow"></i>';
				desc.innerHTML = "Too Cold";
			}

			if (is_day == 0 && precip_mm == 0){
				icon.src = 'img/image1.png';
			}else if (is_day == 0 && precip_mm > 0){
				icon.src = 'img/image2.png';
			}else if (is_day == 1 && precip_mm == 0 && uv >= 4){
				icon.src = 'img/image3.png';
			}else if (is_day == 1 && precip_mm == 0 && uv >= 1 && uv < 4){
				icon.src = 'img/image4.png';
			}else if (is_day == 1 && precip_mm == 0 && uv < 1){
				icon.src = 'img/image5.png';
			}else if (is_day == 1 && precip_mm > 0 && precip_mm <= 3 && uv >= 1){
				icon.src = 'img/image6.png';
			}else if(is_day == 1 &&  precip_mm > 3 && precip_mm <= 7 && uv < 1){
				icon.src = 'img/image7.png';
			}else if(is_day == 1 &&  precip_mm > 7 && uv < 1){
				icon.src = 'img/image8.png';
			}
		})
		.catch(error =>{
			console.error("Error fetching the weather data:", error);
		});
}
