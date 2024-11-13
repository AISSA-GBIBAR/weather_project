var config = {
	CountriesUrl: "https://api.countrystatecity.in/v1/countries",
	Countrieskey: "SHRsRUJsOGRRMDcwZlQ0bGxsZXJaQ1V3bTN2eWJBNlZiYW1CTGpCeA==",
};
let data_world = [];

var name_city = document.querySelector(".name_city");


function loadCountries() {
	let apiEndpoint = config.CountriesUrl;

	fetch(apiEndpoint, { headers: { "X-CSCAPI-KEY": config.Countrieskey } })
		.then((Response) => Response.json())
		.then((data) => {
			let HTML = '<div class="group_city"> <div class="names_city">';
			data_world = data.map((country) => {
				let shortCut_contry = country.iso2;
				let name_country = country.name;
				country_html = `<span class="city ${shortCut_contry}" data-name="${shortCut_contry}" onclick='loadCity("${name_country}", "${shortCut_contry}")'>${name_country}</span>`;
				HTML += country_html
				return {name:name_country, iso2: shortCut_contry}
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

let data_search = document.querySelector("[data-search]");

data_search.addEventListener("input", (e)=>{
	const value = e.target.value;
	data_world.forEach((data)=>{
		const isVisible = data.name.includes(value);
		let element = document.querySelector("." + data.iso2);
		element.classList.toggle("hide", !isVisible);
	})
	
})