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
  <div class="cards">
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
    <div>
      <div class="month"></div>
      <img src="">
    </div>
  </div>
</div>`
}
document.querySelector("main").innerHTML = renderMain()
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
const monthDivs = document.querySelectorAll(".month");
const now = new Date();

monthDivs.forEach((div, index) => {
  const futureDate = new Date(now.getTime() + index * 24 * 60 * 60 * 1000); 
  const day = futureDate.getDate();
  const month = futureDate.toLocaleString('default', { month: 'short' }); 
  div.innerText = `${day} ${month}`;
});
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
      const weatherIcon= document.querySelector('.cloud');
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwe4OG61l8bNuOqGxsXmcVU_TaqCpXzBYrA&s";
      }
      else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQArN53FgvGqwuWNJAMBmkq-JJeyRNjsN9OxQ&s";
      }
      else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ15CRH7o5KJsopKzLSWD7F3Sl3imzCmS51A&s";
      }
      else if (data.weather[0].main == "mist") {
        weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQao1knWPPeceCQR8CwnUFs884ht2SHnl2mCQ&s";
      }
      else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5jgYZtF2paZHz4RqBzeyRlzmOHGgqUjbsw&s";
      };
      const weatherIcons = document.querySelectorAll('.cards img');

      let iconSrc = "";

      if (data.weather[0].main === "Clouds") {
        iconSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwe4OG61l8bNuOqGxsXmcVU_TaqCpXzBYrA&s";
      } else if (data.weather[0].main === "Clear") {
        iconSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQArN53FgvGqwuWNJAMBmkq-JJeyRNjsN9OxQ&s";
      } else if (data.weather[0].main === "Rain") {
        iconSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ15CRH7o5KJsopKzLSWD7F3Sl3imzCmS51A&s";
      } else if (data.weather[0].main === "Drizzle") {
        iconSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5jgYZtF2paZHz4RqBzeyRlzmOHGgqUjbsw&s";
      }
 else if (data.weather[0].main == "mist") {
        iconSrc= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQao1knWPPeceCQR8CwnUFs884ht2SHnl2mCQ&s";
      } 
      weatherIcons.forEach(icon => {
        icon.src = iconSrc;
      });
    })
    .catch((err) => console.error(err))
}

document.querySelector(".search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});
document.querySelector(".search").value = "Noida";
searchWeather();
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ15CRH7o5KJsopKzLSWD7F3Sl3imzCmS51A&s  for rain clouds
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwe4OG61l8bNuOqGxsXmcVU_TaqCpXzBYrA&s for clouds
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQArN53FgvGqwuWNJAMBmkq-JJeyRNjsN9OxQ&s for clear clouds
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5jgYZtF2paZHz4RqBzeyRlzmOHGgqUjbsw&s for Drizzle clouds
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQao1knWPPeceCQR8CwnUFs884ht2SHnl2mCQ&s for mist clouds