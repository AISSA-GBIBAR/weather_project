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
})