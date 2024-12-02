function fetchWeather(Namecity, date = ""){

    keyApi = "96a6054d329c413bbc1121945240311";
    let urlApi;
    if (date == ""){
         urlApi = `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${Namecity} &aqi=no`;
    }else{
         urlApi = `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${Namecity} &dt=${date}`;
    }
    
    let tempC = document.querySelector(".tempC");
    let precipitation = document.querySelector(".precipitation .value");
    let humid = document.querySelector(".humidity .value");
    let wind = document.querySelector(".wind .value");
    let iconTemp = document.querySelector(".icon-temp");

    
    fetch(urlApi)
   .then(response => response.json())
   .then((infoWeather) =>{
        console.log(infoWeather);
        const temp_C = infoWeather.current.temp_c;
        const humidity = infoWeather.current.humidity;
        const wind_kph = infoWeather.current.wind_kph;
        const precip_mm = infoWeather.current.precip_mm;
        const is_day = infoWeather.current.is_day;
        const uv = infoWeather.current.uv;

        tempC.innerHTML = temp_C;
        precipitation.innerHTML = precip_mm + " mm";
        humid.innerHTML = humidity + " %";
        wind.innerHTML = wind_kph + " km/h";

        if (temp_C > 35 && is_day == 1 && uv > 3){
            iconTemp.innerHTML = '<i class="bi bi-thermometer-sun redIcon"></i>';
        }else if (temp_C > 35 && is_day == 1){
            iconTemp.innerHTML = '<i class="bi bi-thermometer-high redIcon"></i>';
        }else if ((temp_C > 15 && temp_C < 25)){
            iconTemp.innerHTML = '<i class="bi bi-thermometer-half"></i>';
        }else if ((temp_C > 0 && temp_C < 15)){
            iconTemp.innerHTML = '<i class="bi bi-thermometer-low"></i>';
        }else if (temp_C < 0){
            iconTemp.innerHTML = '<i class="bi bi-thermometer"></i>';
        }else if ((temp_C < 0 && temp_C < 15) && precip_mm > 0){
            iconTemp.innerHTML = '<i class="bi bi-thermometer-snow"></i>';
        }
        
        
   });
}
