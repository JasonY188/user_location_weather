const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', getLocalWeather)

function getPosition() {

    return new Promise((res, rej) => {
   
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Sorry, your browser does not support HTML5 geolocation.");
      }
  
      function success(position) {
        let lon;
        let lat;
        res(position)
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        const api =  ""
        console.log(lat)
        console.log(lon)
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
        console.log(base);
        fetch(base) 
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data.name)
            console.log(data)
           
            const {temp} = data.main;
            const place = data.name;
            const {description, icon} = data.weather[0];
            const {sunrise, sunset} = data.sys;

            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const celsius = temp - 273.15
            const fahrenheit = (celsius * 9 / 5 ) + 32;
            console.log(typeof place)
            //convert Epoch(unix) time to GMT
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);

            //interact with DOM to show data
            iconImg.src = iconUrl;
            loc.textContent = `${place}`;
            desc.textContent = `${description}`;
            tempC.textContent = `${celsius.toFixed(2)} C`;
            tempF.textContent = `${fahrenheit.toFixed(2)} F`;
            sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
            sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        })
      }
  
      function error(error) {
        console.log("Sorry, we can\'t retrieve your local weather without location permission.");
      }
  
    });
  
  };
  
  async function getLocalWeather() {
   console.log(await getPosition());
  };
  
 