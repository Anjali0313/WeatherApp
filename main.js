function renderMain(city = "City") {
  return `
<div>
  <div class="locationdiv">
    <img class="location" src="https://www.svgrepo.com/show/532539/location-pin.svg">
    <div class="city-name">${city}</div>
  </div>
      <div id="Months"></div>
  </div>
  <div>
    <img class="cloud">
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
  <div class="cards"></div>
</div>`
}
document.querySelector("main").innerHTML = renderMain()

function renderFullDate() {
const date = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayName = days[date.getDay()];
const dayNumber = date.getDate();
const monthName = months[date.getMonth()];
const fullDate = `${dayName}, ${dayNumber} ${monthName}`;
document.getElementById("Months").innerText = fullDate;
}
renderFullDate() 

function searchWeather() {
  const city = document.querySelector(".search").value.trim();
  if (!city) return;
  const apiKey = "b438f16eb0c75fd741e0afc7fb8a53e3";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      document.querySelector(".locationdiv div").innerText = city;
      document.getElementById("Humidity").innerText = `${data.main.humidity}%`;
      document.getElementById("windspeed").innerText = `${data.wind.speed} M/S`;
      document.querySelector(".temp").innerText = `${data.main.temp}°C`;

      const weatherIcon = document.querySelector(".cloud");
      const condition = data.weather[0].main;
      const icons = {
        Clouds: "assets/clouds.png",
        Clear: "assets/clear.png",
        Rain: "assets/rain.png",
        Drizzle: "assets/drizzle.png",
        Mist: "assets/mist.png"
      };
      weatherIcon.src = icons[condition] || "assets/clouds.png";
      renderHourlyForecast(city);
    })
    .catch((err) => console.error(err))
}
function renderHourlyForecast(city) {
  const apiKey = "b438f16eb0c75fd741e0afc7fb8a53e3";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const hourlyCards = document.querySelector(".cards");
      hourlyCards.innerHTML = ""; 

      for (let i = 0; i < 8; i++) {
        const forecast = data.list[i];
        const time = new Date(forecast.dt_txt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        const temp = Math.round(forecast.main.temp);
        const condition = forecast.weather[0].main;

    const icons = {
      Clouds: "assets/clouds.png",
      Clear: "assets/clear.png",
      Rain: "assets/rain.png",
      Drizzle: "assets/drizzle.png",
      Mist: "assets/mist.png"
    };
    const icon = icons[condition] || "assets/clouds.png";

        const cardHTML = `
          <div class="hour-card">
            <div class="month">${time}</div>
            <img src="${icon}" alt="${forecast.weather[0].description}">
            <div class="temps">${temp}°C</div>
          </div>
        `;
        hourlyCards.innerHTML += cardHTML;
      }
    })
    .catch(err => console.error("Forecast fetch error:", err));
}
document.querySelector(".search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});
document.querySelector(".search").value = "Noida";
searchWeather();
