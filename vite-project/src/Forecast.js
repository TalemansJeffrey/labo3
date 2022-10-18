export default class Forecast { 
    constructor(api_Key) {
        this.apiKey = api_Key;

        this.displayForecast();
        this.getLocations();

        if (localStorage.getItem("forecast") && Date.now() - localStorage.getItem("timestamp").timestamp < 60000) { //600000 = 10 minutes
            const forecastData = JSON.parse(localStorage.getItem("forecast"));

            this.displayForecast(forecastData);
            console.log("CACHE");
        }
        else {
            this.getLocations
        }


    }

    //Get the forecast from my location
    getLocations = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getForecast.bind(this));
        } else {
            alert("Geolocation is not supported by this browser.");

    }

    }
    getForecast = (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=no&lang=nl`;
        fetch(url)
        .then(response => response.json())
        .then(data => 
            {
                console.log(data);
                localStorage.setItem( 'forecast', JSON.stringify(data));
                //save timestamp 
                localStorage.setItem('timestamp', Date.now());
                this.displayForecast(data);


            })
        .catch(err => console.log(err));
    }

    displayForecast = (data) => {
                    //display the humidity for the next 5 dayss


        const forecast = JSON.parse(localStorage.getItem('forecast'));
        console.log(forecast);
        const forecastDiv = document.querySelector('.forecast');


    

        
        const forecastHTML = `
        <div class="forecast">
        <div class="forecast__day">Day 1</div>
        <h2 class="forecast__name_day">${forecast.forecast.forecastday[0].date}</h2>
        <div class="forecast__icon">${forecast.forecast.forecastday[0].day.condition.text}</div>
        <div class="forecast__temp">${forecast.forecast.forecastday[0].day.avgtemp_c}°C</div>
        <div class="forecast__humidity">${forecast.forecast.forecastday[0].day.avghumidity}%</div>
        <div class="forecast__chance_of_rain">${forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</div>



        </div>
        <div class="forecast">
        <div class="forecast__day">Day 2</div>
        <h2 class="forecast__name_day">${forecast.forecast.forecastday[1].date}</h2>

        <div class="forecast__icon">${forecast.forecast.forecastday[1].day.condition.text}</div>

        <div class="forecast__temp">${forecast.forecast.forecastday[1].day.avgtemp_c}°C</div>
        <div class="forecast__humidity">${forecast.forecast.forecastday[1].day.avghumidity}%</div>
        <div class="forecast__chance_of_rain">${forecast.forecast.forecastday[1].day.daily_chance_of_rain}%</div>


        </div>
        <div class="forecast">
        <div class="forecast__day">Day 3</div>
        <h2 class="forecast__name_day">${forecast.forecast.forecastday[2].date}</h2>

        <div class="forecast__icon">${forecast.forecast.forecastday[2].day.condition.text}</div>

        <div class="forecast__temp">${forecast.forecast.forecastday[2].day.avgtemp_c}°C</div>
        <div class="forecast__humidity">${forecast.forecast.forecastday[2].day.avghumidity}%</div>
        <div class="forecast__chance_of_rain">${forecast.forecast.forecastday[2].day.daily_chance_of_rain}%</div>


        </div>
   
        `;
        forecastDiv.innerHTML = forecastHTML;

        console.log(forecastHTML);


        


        //get all data for day 1
     /*   const day1 = forecast.forecast.forecastday[0].day;

        console.log(day1);

        const day1Icon = forecast.forecast.forecastday[0].icon;

        console.log(day1Icon);*/

    }
        




        

    }


    


