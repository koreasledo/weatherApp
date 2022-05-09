import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, selectedCity, handleCityChange }) => {
  console.log("cities?", cities);
  return (
    <div className='weather-btn'>
      <Button variant={`${selectedCity == null ? "dark" : "light"}`}  onClick={()=> handleCityChange("current")}>Current</Button>
      
      {cities.map((city, index)=> (
        <Button variant={`${selectedCity == city ? "dark" : "light"}`} key={index} onClick={()=> handleCityChange(city)}>{city}</Button>
      ))}
    </div>
  );
};

export default WeatherButton;