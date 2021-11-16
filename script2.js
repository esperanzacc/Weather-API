window.onload = () => {
  //make sure page is fully loaded.
  const apiKey = "338f9c324f6762623aaff8ef8e35ef75"; //User's unique API key(find it on your account page)
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const cityName = document.getElementById("city");
  const weather = document.getElementById("weather");
  const temperature = document.getElementById("temperature");
  const feellike = document.getElementById("feellike");

  const getWeatherData = function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      //in curly bracket will get JSON format, and fetch() will get new Promise
      .then(function (response) {
        if (response.status === 404) {
          alert("Not Found");
        }
        if (response.status !== 200) {
          console.log("Status is not 20");
        }
        return response.json(); //will return another new Promise
      })
      .then(function (jsonResponse) {
        const obj = jsonResponse;
        console.log(obj);
        cityName.innerHTML = obj.name;
        weather.innerHTML = obj.weather
          .map((weatherStatment) => weatherStatment.main) //new array
          .join(","); //return a string from array
        temperature.innerHTML = obj.main.temp;
        feellike.innerHTML = obj.main.feels_like;
      }) //get JSON format response
      .catch(function (error) {
        console.log(`error:${error}`);
      });
  };
  searchInput.addEventListener("keydown", function (e) {
    //keydown event is fired when a key is pressed.
    if (e.code !== "Enter") {
      // represents a physical key on the keyboard
      return;
    }
    getWeatherData(searchInput.value); //the city of name user types
  });

  searchButton.addEventListener("click", function (e) {
    getWeatherData(searchInput.value); //the city of name user types
  });

  getWeatherData(searchInput.value); //the city of name user types
};
