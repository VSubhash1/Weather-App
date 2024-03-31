import React, {useState} from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png.png';
import cloud_icon from '../Assets/cloud.png.png';
import rain_icon from '../Assets/rain.png.png';
import snow_icon from '../Assets/snowflake.png';
import drizzle_icon from '../Assets/drizzle.png.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/pollen-allergy.png';

const WeatherApp = () => {

    let api_key = "8d0ef7014ad215c5a3cb658c2d8ab459";

    const[wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
       const element = document.getElementsByClassName('Search for a city');
       if(element[0].value === ''){
           return 0;
       }
       let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
         
       let response = await fetch(url);
         let data = await response.json();
        const humidity = document.getElementsByClassName('humidity-percentage');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity + '%';
        wind[0].innerHTML = Math.floor(data.wind.speed)+ 'km/hr';
        temperature[0].innerHTML = data.main.temp + '°C';
        location[0].innerHTML = data.name + ', ' + data.sys.country;

        if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
            setWicon(snow_icon);
        }
        else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50n') {
            setWicon(clear_icon);
        }
    }
    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='Search for a city' placeholder='search'/>
                <div className='search-icon' onClick={()=>{search()}} style={{  top: 100, right: 175, }}>
                    <img src={search_icon} alt='search' style={{ width: '20px', height: '20px' }} />
                </div>
                
            </div>
            <div className="weather-image">
                <img src={wicon} alt='cloud' style={{ down:500, width: '100px', height: '100px' }} />
            </div>
            <div className="weather-temp">
                25°C
            </div>
            <div className="weather-location">
                London
            </div>
            <div className="data-container">
                <div className="element">
                 <img src= {humidity_icon} alt="" className="icon" style={{  down:100, left: 400, width: '50px', height: '50px' }}  />
                    <div className="data">
                        <div className="humidity-percentage">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                    
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" style={{  down: 500, left: 400, width: '40px', height: '40px' }} />
                    <div className="data">
                        <div className="wind-rate">20 km/hr </div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;