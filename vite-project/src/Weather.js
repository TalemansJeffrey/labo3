export default class Weather {
    constructor(api_Key) {
        this.apiKey = api_Key;

        // check if there is data in local storage




        //check if timestamp is older than 10 minutes

        if (localStorage.getItem("weather") && Date.now() - localStorage.getItem("timestamp").timestamp < 60000) { //600000 = 10 minutes
            const weatherData = JSON.parse(localStorage.getItem("weather"));


            this.displayWeather(weatherData);
            


            console.log("CACHE");

        }
       
        else {
            this.getLocation();

        }

        

    }
        // Get location from browser
        getLocation = () => {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
            } else {
                alert("Geolocation is not supported by this browser.");

        }
    
        }

        // Get weather from API
    getWeather = (position) =>  {  

        console.log(this);
        console.log(position);
    
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no&lang=nl`;
        fetch(url)
        .then(response => response.json())
        .then(data => 
            {


                //save data to local storage
                    localStorage.setItem('weather', JSON.stringify(data));
                    //save timestamp 
                    localStorage.setItem('timestamp', Date.now());
                    this.displayWeather(data);
            }
        )

        }
        
        



        

       

    displayWeather = (data) => {


        const temp = data.current.temp_c;
        document.querySelector(".temp").innerText = temp + "°C";

        const weather = data.current.condition.text;
        document.querySelector(".weather").innerText = weather; 
        
        const feelsLike = data.current.feelslike_c;
        document.querySelector(".feels-like").innerText = "Het voelt als " + feelsLike + "°C";

        const humidity = data.current.humidity;
        document.querySelector(".humidity").innerText = "Vochtigheid: " + humidity + "%";

        const date = data.location.localtime;
        document.querySelector(".date").innerText = date;




        const icon = data.current.condition.icon;


        const img = document.createElement("img");

        img.src = icon;

        //create an image 
        document.querySelector(".icon").appendChild(img);

    
    
    }

    


    

        
}
