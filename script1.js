window.onload = () => {
  //make sure page is fully loaded.
  const apiKey = "338f9c324f6762623aaff8ef8e35ef75"; //User's unique API key(find it on your account page)
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const cityName = document.getElementById("city");
  const weather = document.getElementById("weather");
  const temperature = document.getElementById("temperature");
  const feellike = document.getElementById("feellike");

  const getWeatherData = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (response.status === 404) {
          //400 bad request
          alert("Not Found");
          throw "Not Found";
        }
        if (response.status !== 200) {
          throw "Status do not succeed.";
        }
        return response.json(); //promise
      })
      .then((data) => {
        //grab data from json (json from fetch)
        const obj = data;
        console.log(obj);
        cityName.innerHTML = obj.name;
        weather.innerHTML = obj.weather
          .map((weatherStatment) => weatherStatment.main)
          .join(",");
        temperature.innerHTML = obj.main.temp;
        feellike.innerHTML = obj.main.feels_like;
      })
      .catch((error) => {
        console.log(`error:${error}`);
      });
  };
  searchInput.addEventListener("keydown", function (e) {
    if (e.code !== "Enter") {
      return;
    }
    getWeatherData(searchInput.value);
  });

  searchButton.addEventListener("click", function (e) {
    getWeatherData(searchInput.value);
  });

  getWeatherData(searchInput.value);
};
