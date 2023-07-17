//Global Variables, selectors and array for local storage
var citySearcherEl=document.querySelector("#citySearcher");
var cityNameEl=document.querySelector("#cityName");
var currentWeatherEl=document.querySelector("#currentWeather");
var searchedTextEl = document.querySelector("#searchedText");
var fivedayForecastEl = document.querySelector("#fivedayForecast");
var fivedayContainersEl = document.querySelector("#fivedayContainers");
var pastListButtonEl = document.querySelector("#pastList-button");
var savedCities = [];

//if else for if there is no text and for city query
var SubmitHandler = function(event){
    event.preventDefault();
    var city = cityNameEl.value.trim();
    if(city){
        fetchCityWeather(city);
        fetch5Day(city);
        savedCities.unshift({city});
        cityNameEl.value = "";
    } else{
        alert("Please provide a City Name");
    }
    savedSearch();
    pastSearches(city);
}

//Event listener for the text
citySearcherEl.addEventListener("submit", SubmitHandler);

//API call for current day
var fetchCityWeather = function(city){
    var apiKey = "2161b5e612d2203fb476bf146d628c77"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            showWeather(data, city);
        });
    });
};

//Function for weather display
var showWeather = function(weather, searchCity){
   currentWeatherEl.textContent= "";  
   searchedText.textContent=searchCity;

   //Display current date, time, image icons for weather, temperature, humidity, wind speed
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + dayjs(weather.dt.value).format("MMM D, YYYY") + ") ";
   searchedText.appendChild(currentDate);
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   searchedText.appendChild(weatherIcon);
   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °C";
   temperatureEl.classList = "list-group-item"
   currentWeatherEl.appendChild(temperatureEl);
   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"
   currentWeatherEl.appendChild(humidityEl);
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " m/s";
   windSpeedEl.classList = "list-group-item"
   currentWeatherEl.appendChild(windSpeedEl);
}

//API call for 5 day forecast
var fetch5Day = function(city){
    var apiKey = "2161b5e612d2203fb476bf146d628c77"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           show5Days(data);
        });
    });
};

//Appending information to the cards (thanking bootstrap for the ease)
var show5Days = function(weather){
    fivedayContainersEl.textContent = ""
    fivedayForecastEl.textContent = "5-Day Weather Forecast:";
    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= dayjs.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);
       //Icon for weather
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
       forecastEl.appendChild(weatherIcon);
       //Temperature display
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = "Temperature: " + dailyForecast.main.temp + " °C";
        forecastEl.appendChild(forecastTempEl);
        //Humidity display
       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";
       forecastEl.appendChild(forecastHumEl);
       // Wind Speed displau
       var forecastWinEl=document.createElement("span");
       forecastWinEl.classList = "card-body text-center";
       forecastWinEl.textContent = "Wind Speed: " + dailyForecast.wind.speed + " m/s";
        forecastEl.appendChild(forecastWinEl);
       //Displaying information above in the 5 day forecast
       fivedayContainersEl.appendChild(forecastEl);
    }
}

