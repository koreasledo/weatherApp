import React from 'react';

const WeatherBox = ({weather}) => {
  console.log("Weather?", weather);
  return (
    <div className="weather-box">
      <div className='weather-main'>
        <h1>{weather?.name}</h1>
        <h2>{Math.round(weather?.main.temp * 10)/10.0}°</h2>
        <span>체감 온도 {Math.round(weather?.main.feels_like * 10)/10.0}°</span>
        <span className='weather-minmax'>최저 {Math.round(weather?.main.temp_min * 10)/10.0}° / 최고 {Math.round(weather?.main.temp_max * 10)/10.0}°</span>
        <h3>{weather?.weather[0].description}</h3>
        <div className='weather-sub1'>
          구름 {weather?.clouds.all} | 습도 {weather?.main.humidity}% | 바람 {Math.round(weather?.wind.speed * 10)/10.0}m/s
        </div>
      </div>
    </div>
  );
}

export default WeatherBox;