//default city when the page loads
let cityInput = "London";

const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
const citiesList = document.getElementById("citiesList");


//add click even to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    // app.style.opacity = "0";
  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Enter a valid city");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    // app.style.opacity = "0";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${year}/${month}/${day}`).getDay()];
};
function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=870afc6b127148dba12192406232310&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64".length
      );
      icon.src = "icons/" + iconId;
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";
      let timeOfDay = "day";
      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        app.style.backgroundImage = `url(images/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1035 ||
        code == 1073 ||
        code == 1076 ||
        code == 1079 ||
        code == 1082
      ) {
        app.style.backgroundImage = `url(images/${timeOfDay}/clouds.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        } else if (
          code == 1063 ||
          code == 1069 ||
          code == 1072 ||
          code == 1050 ||
          code == 1053 ||
          code == 1080 ||
          code == 1083 ||
          code == 1086 ||
          code == 1089 ||
          code == 1092 ||
          code == 1095 ||
          code == 1204 ||
          code == 1207 ||
          code == 1240 ||
          code == 1243 ||
          code == 1246 ||
          code == 1249 ||
          code == 1252
        ) {
          app.style.backgroundImage = `url(images/${timeOfDay}/rain.jpg)`;
          btn.style.background = "#647d75";
          if (timeOfDay == "night") {
            btn.style.background = "#325c80";
          }
        } else {
          app.style.backgroundImage = `url(images/${timeOfDay}/snow.jpg)`;
          btn.style.background = "#4d72aa";
          if (timeOfDay == "night") {
            btn.style.background = "#1b1b1b";
          }
        }
        app.style.opacity = "1";
      }
    })
    .catch(() => {
      alert("Enter a valid city");
      app.style.opacity = "1";
    });
}


search.addEventListener("input", () => {
  const inputValue = search.value;

  // Clear the previous dropdown options
  citiesList.innerHTML = "";

  if (inputValue.trim() !== "") {
    // Make an API request to get city suggestions
    fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&sort=population&cnt=10&appid=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the data and populate the dropdown
        const cities = data.list;
        cities.forEach((city) => {
          const option = document.createElement("option");
          option.value = city.name;
          citiesList.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching city data: ", error);
      });
  }
});


fetchWeatherData();
app.style.opacity = "1";
