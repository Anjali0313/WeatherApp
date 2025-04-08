
function renderMain(city = "City"){
return`
<div>
<div class="locationdiv">
<img class="location" src="https://www.svgrepo.com/show/532539/location-pin.svg">
  <div class="city-name">${city}</div>
</div>
    <div id="Months"></div>
</div>
<div>
<img class="cloud"src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg">
<div class="tempr">
<div class="temp"></div>
<h3>Haze</h3>
</div>
</div>
<div>
<div>
<img class="drop"src="https://www.svgrepo.com/show/521619/drop.svg">
<div class="Humiditys">
<div>Humidity</div>
<div id='Humidity'></div>
</div>
</div>
<div>
<img class="wind" src="https://www.svgrepo.com/show/522344/wind.svg">
<div class="winds">
<div>Wind Speed</div>
<div id="windspeed"></div>
</div>
</div>
</div>
<div class="cards">
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
<div><img src="https://www.svgrepo.com/show/339074/cloudy-hazy.svg"></div>
</div>
</div>`
}
document.querySelector("main").innerHTML= renderMain()
const date = new Date();


const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];


const dayName = days[date.getDay()];
const dayNumber = date.getDate();
const monthName = months[date.getMonth()];


function renderFullDate() {
  const fullDate = `${dayName}, ${dayNumber} ${monthName}`;
  document.getElementById("Months").innerText = fullDate;
}

renderFullDate();

function searchWeather() {
  const city = document.querySelector(".search").value.trim();
  if (!city) return alert("Please enter a city name");
const apiKey = "b438f16eb0c75fd741e0afc7fb8a53e3";
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
 fetch(url)
 .then((res) =>  res.json())
 .then((data) =>{ console.log(data)
  document.querySelector(".locationdiv div").innerText = city;
  document.getElementById("Humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("windspeed").innerText = `${data.wind.speed} M/S`;
  document.querySelector(".temp").innerText = `${data.main.temp}°C`;
 })
 .catch((err) => console.error(err))
}

document.querySelector(".search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});
