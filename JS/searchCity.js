var config = {
    CountriesUrl : "https://api.countrystatecity.in/v1/countries", 
    Countrieskey : "SHRsRUJsOGRRMDcwZlQ0bGxsZXJaQ1V3bTN2eWJBNlZiYW1CTGpCeA=="
}

var name_city = document.querySelector(".name_city");

function loadCountries() {
    let apiEndpoint = config.CountriesUrl;

    fetch(apiEndpoint, {headers: {"X-CSCAPI-KEY": config.Countrieskey}})
    .then(Response => Response.json())
    .then(data => {
        data.forEach(country =>{
            
            let shortCut_contry = country.iso2;
            let urlCity = `${apiEndpoint}/${shortCut_contry}/cities`;

            fetch(urlCity, {headers: {"X-CSCAPI-KEY": config.Countrieskey}})
            .then(Response => Response.json())
            .then(data => {
                 console.log(data)
             })
        })


    })
    .catch(error => console.error('Error loading countries : ', error ))
}

loadCountries()