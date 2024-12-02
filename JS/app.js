let remove_part2 = document.querySelector(".remove-icon");
let containerWeather = document.querySelector(".container-weather");
let part1 = document.querySelector(".part-1");

remove_part2.addEventListener("click", ()=>{
    containerWeather.classList.toggle("hide");
})
part1.addEventListener("click", ()=>{
    containerWeather.classList.toggle("hide");
})



let plus = document.querySelector(".plus-anther-location");
let search_popUp = document.querySelector(".pop-up-search");

plus.addEventListener("click", ()=>{
    search_popUp.classList.toggle("active");
    plus.classList.toggle("x");
    loadCountries();
})

// ================ name Day and Date =================

let elementNameDay = document.querySelector(".nameDay");
let formatDate = document.querySelector(".formatDate");

const today = new Date();

//======> get name day
const nameDay = today.toLocaleString("en-US", {weekday: "long"});
elementNameDay.innerHTML = nameDay;

//=======> get date
let day = today.getDate();
day = day < 10? `0${day}` : day;

const month = today.toLocaleString("en-US", {month: "short"});
const year = today.getFullYear();

const date = `${day} ${month} ${year}`;

formatDate.innerHTML = date;

// =============== realod page od popup error =============
let buttonError = document.querySelector(".button-error");

buttonError.addEventListener("click", ()=>{
    location.reload();
})