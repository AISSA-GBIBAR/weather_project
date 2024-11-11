var config = {
	CountriesUrl: "https://api.countrystatecity.in/v1/countries",
	Countrieskey: "SHRsRUJsOGRRMDcwZlQ0bGxsZXJaQ1V3bTN2eWJBNlZiYW1CTGpCeA==",
};

var name_city = document.querySelector(".name_city");

var all_city_of_world = {};

function loadCountries() {
	let apiEndpoint = config.CountriesUrl;

	fetch(apiEndpoint, { headers: { "X-CSCAPI-KEY": config.Countrieskey } })
		.then((Response) => Response.json())
		.then((data) => {
			data.forEach((country) => {
				let shortCut_contry = country.iso2;
				// let urlCity = `${apiEndpoint}/${shortCut_contry}/cities`;
				all_city_of_world[country.name] = [shortCut_contry];
			});
		})
		.catch((error) => console.error("Error loading countries : ", error));
}
loadCountries() 

function loadCity() {
	let apiEndpoint = config.CityUrl;
	for (let key in all_city_of_world) {
		console.log(key);
        
	}
    // console.log(all_city_of_world);
    
}
loadCity();
