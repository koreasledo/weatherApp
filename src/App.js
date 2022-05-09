import { useState, useEffect } from "react";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [ weather, setWeather ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const cities = [ 'seoul', 'new york', 'moscow', 'paris' ];
  const [apiError, setAPIError] = useState("")

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b87682c00af22d0dd97235cab7220765&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false)
    }catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b87682c00af22d0dd97235cab7220765&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect (()=> {
    if(city == null ) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  },[city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#000000" loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city}/>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;