var config = {
	CountriesUrl: "https://api.countrystatecity.in/v1/countries",
	Countrieskey: "SHRsRUJsOGRRMDcwZlQ0bGxsZXJaQ1V3bTN2eWJBNlZiYW1CTGpCeA==",
};

var name_city = document.querySelector(".name_city");

function loadCountries() {
	let apiEndpoint = config.CountriesUrl;

	fetch(apiEndpoint, { headers: { "X-CSCAPI-KEY": config.Countrieskey } })
		.then((Response) => Response.json())
		.then((data) => {
			let HTML = '<div class="group_city"> <div class="names_city">';
			data.forEach((country) => {
				let shortCut_contry = country.iso2;
				let name_country = country.name;
				HTML += `<span class="city" data-name="${shortCut_contry}" onclick='loadCity("${name_country}", "${shortCut_contry}")'>${name_country}</span>`;
			});
			HTML += "</div>";
			name_city.innerHTML = HTML;
		})
		.catch((error) => console.error("Error loading countries : ", error));
}
 
function loadCity(name_contry, iso2) {	
	name_city.scrollTop = 0;
	let apiEndpoint = `${config.CountriesUrl}/${iso2}/cities`;

	fetch(apiEndpoint, { headers: { "X-CSCAPI-KEY": config.Countrieskey } })
	.then((Response) => Response.json())
	.then((data) =>{
		let HTML = `<div class="name_group" data-countries = "${iso2}">
					<i class="bi bi-arrow-left-circle-fill" onclick="loadCountries()" ></i>
					 ${name_contry}</div> 
					<div class="group_city"> <div class="names_city">`;
		data.forEach((city)=>{
			HTML += `<span class="city" data-city = "${city.name}">${city.name}</span>`;
		})
		HTML += "</div>";
		name_city.innerHTML = HTML;

		
	})
}
