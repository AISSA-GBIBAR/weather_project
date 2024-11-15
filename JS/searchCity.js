var config = {
	CountriesUrl: "https://api.countrystatecity.in/v1/countries",
	Countrieskey: "SHRsRUJsOGRRMDcwZlQ0bGxsZXJaQ1V3bTN2eWJBNlZiYW1CTGpCeA==",
};
let data_world = [];

var name_city = document.querySelector(".name_city");
let data_search = document.querySelector("[data-search]");



function loadCountries() {
	let apiEndpoint = config.CountriesUrl;
	data_search.value = "";
	data_search.placeholder = "Search for countries"

	fetch(apiEndpoint, { headers: { "X-CSCAPI-KEY": config.Countrieskey } })
		.then((Response) => Response.json())
		.then((data) => {
			let HTML = '<div class="group_city"> <div class="names_city">';
			data_world = data.map((country) => {
				let shortCut_contry = country.iso2;
				let name_country = country.name;
				country_html = `<span class="city A-${shortCut_contry}" data-name="${shortCut_contry}" onclick='loadCity("${name_country}", "${shortCut_contry}")'>${name_country}</span>`;
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
	data_search.value = "";
	data_search.placeholder = "Search for a " + name_contry

	fetch(apiEndpoint, { headers: { "X-CSCAPI-KEY": config.Countrieskey } })
	.then((Response) => Response.json())
	.then((data) =>{
		let HTML = `<div class="name_group" data-countries = "${iso2}">
					<i class="bi bi-arrow-left-circle-fill" onclick="loadCountries()" ></i>
					 ${name_contry}</div> 
					<div class="group_city"> <div class="names_city">`;
		data_world = data.map((city)=>{
			country_html = `<span class="city A-${city.id}" data-city = "${city.name}">${city.name}</span>`;
			HTML += country_html
			return {name:city.name, iso2:city.id}
		})
		HTML += "</div>";
		name_city.innerHTML = HTML;

		
	})
}

function Cpitalize(str){
	return str.split(" ")
		   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		   .join(" ");
}


data_search.addEventListener("input", (e)=>{
	const value = e.target.value;
	data_world.forEach((data)=>{
		const isVisible = data.name.includes(value) || data.name.includes(Cpitalize(value));
		
		let element = document.querySelector(".A-" + data.iso2);
		element.classList.toggle("hide-search", !isVisible);
	})
	
})