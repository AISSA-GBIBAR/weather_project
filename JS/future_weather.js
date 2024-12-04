// function get_future_weather() {
// // Replace with your OpenWeatherMap API key
// const apiKey = "aff6a4a18d57b545b2c2d26b482a20df";
// const city = "Deroua"; // Replace with the desired city
// const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// // Fetch the 5-day forecast
// fetch(apiUrl)
//   .then(response =>  response.json())
//   .then(data => {
    
//     // Filter data for the next 4 days
//     const forecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 4); // Filter every 8th entry (8 x 3-hour intervals = 24 hours)

//     // Display the forecast
//     forecasts.forEach(forecast => {
//       const date = new Date(forecast.dt * 1000); // Convert Unix timestamp to JS date
//       const weatherDescription = forecast.weather[0].description;
//       const temperature = forecast.main.temp;
//       const dateString = date.toDateString();

//       console.log(`Date: ${dateString}`);
//       console.log(`Description: ${weatherDescription}`);
//       console.log(`Temperature: ${temperature}°C`);
//       console.log("--------------------------");
//     });
//   })
//   .catch(error => {
//     console.error("Error fetching the weather data:", error);
//   });

// }
// get_future_weather()