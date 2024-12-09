async function fetchWeather(nameCity) {
    const apiKey = "96a6054d329c413bbc1121945240311";
    const urlApi = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${nameCity}&aqi=no`;

    try {
        const response = await fetch(urlApi);
        const infoWeather = await response.json();

        let temp_C = infoWeather.current.temp_c;
        temp_C = temp_C < 10 ? "0" + temp_C : temp_C;

        return {
            temp_C: temp_C,
            humidity: infoWeather.current.humidity,
            wind_kph: infoWeather.current.wind_kph,
            precip_mm: infoWeather.current.precip_mm,
            is_day: infoWeather.current.is_day,
            uv: infoWeather.current.uv,
        };
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        return null;
    }
}

async function codeHTML(nameCity) {
    const result = await fetchWeather(nameCity);

    if (result && typeof result === "object") {
        const { temp_C, humidity, wind_kph, precip_mm, is_day, uv } = result;

        let tempC = document.querySelector(".tempC");
        let precipitation = document.querySelector(".precipitation .value");
        let humid = document.querySelector(".humidity .value");
        let wind = document.querySelector(".wind .value");
        let iconTemp = document.querySelector(".icon-temp");
        let desc = document.querySelector(".desc");
        let icon = document.querySelector(".image-weather");

        tempC.innerHTML = temp_C;
        precipitation.innerHTML = precip_mm + " mm";
        humid.innerHTML = humidity + " %";
        wind.innerHTML = wind_kph + " km/h";

        if (temp_C >= 35 && is_day == 1 && uv > 3) {
            iconTemp.innerHTML = '<i class="bi bi-thermometer-sun redIcon"></i>';
            desc.innerHTML = "Heat";
        } else if (temp_C > 25 && temp_C < 35 && is_day == 1) {
            iconTemp.innerHTML = '<i class="bi bi-thermometer-high redIcon"></i>';
            desc.innerHTML = "Moderate";
        } else if (temp_C > 15 && temp_C <= 25) {
            iconTemp.innerHTML = '<i class="bi bi-thermometer-half"></i>';
            desc.innerHTML = "Moderate";
        } else if (temp_C > 0 && temp_C <= 15) {
            iconTemp.innerHTML = '<i class="bi bi-thermometer-low"></i>';
            desc.innerHTML = "Cold";
        } else if (temp_C < 0) {
            iconTemp.innerHTML = '<i class="bi bi-thermometer"></i>';
            desc.innerHTML = "Too Cold";
        } else if (temp_C < 0 && temp_C < 15 && precip_mm > 0) {
            iconTemp.innerHTML = '<i class="bi bi-thermometer-snow"></i>';
            desc.innerHTML = "Too Cold";
        }

        if (is_day == 0 && precip_mm == 0) {
            icon.src = "img/image1.png";
        } else if (is_day == 0 && precip_mm > 0) {
            icon.src = "img/image2.png";
        } else if (is_day == 1 && precip_mm == 0 && uv >= 4) {
            icon.src = "img/image3.png";
        } else if (is_day == 1 && precip_mm == 0 && uv >= 1 && uv < 4) {
            icon.src = "img/image4.png";
        } else if (is_day == 1 && precip_mm == 0 && uv < 1) {
            icon.src = "img/image5.png";
        } else if (is_day == 1 && precip_mm > 0 && precip_mm <= 3 && uv >= 1) {
            icon.src = "img/image6.png";
        } else if (is_day == 1 && precip_mm > 3 && precip_mm <= 7 && uv < 1) {
            icon.src = "img/image7.png";
        } else if (is_day == 1 && precip_mm > 7 && uv < 1) {
            icon.src = "img/image8.png";
        }

        let sections = document.querySelector("section");
        let part1 = document.querySelector(".part-1");
        let changeColorNights = document.querySelectorAll(".changeColor");

        if (is_day == 0) {
            sections.classList.toggle("bg-night");
            part1.style.backgroundImage = "url(../img/bg-night.jpg)";
            changeColorNights.forEach((element) => {
                element.classList.toggle("night");
            });
        } else if (is_day == 1 && precip_mm > 2) {
            sections.classList.toggle("bg-winter");
        }
    } else {
        console.error("Failed to fetch or process weather data");
    }
}
