import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HourlyWeather from "./HourlyWeather";
import Loader from "./Loader";
import Search from "./Search";
import Weather from "./Weather";
import WeeklyWeather from "./WeeklyWeather";

function Main() {
  const API_KEY = "6fb64e2ee63c4e1ab5601828243103";
  const [weatherLocationData, setweatherLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [WeeklyWeatherData, setWeeklyWeatherData] = useState([]);
  const [HourlyData, setHourlyData] = useState(null);
  const [loader, setLoader] = useState(false);

  const onSearchedCity = (data) => {
    setLoader(true);
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${data}&days=7&aqi=no&alerts=no`;
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setWeatherData(response.data.current);
          setweatherLocationData(response.data.location);
          setWeeklyWeatherData(response.data.forecast);
          setHourlyData(response.data.forecast.forecastday[0]);

          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  };
  
  
  return (
    <div className="background py-3 main">
      {loader ? <Loader /> : null}
      <div className="d-flex">
        {
          loader?null:
        
        <Search searchedCity={onSearchedCity} />}
         {
          loader?null:
        <Link to="/compare">
          <button
            className="btn btn-light mx-3"
            type="submit"
            id="button-addon2"
          >
            Compare
          </button>
        </Link>}
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-around flex-column w-50">
        {
          loader?null:
          <Weather
            weatherData={weatherData}
            weatherLocationData={weatherLocationData}
          />}
           {
          loader?null:<HourlyWeather HourlyData={HourlyData} />}
        </div>
        {
          loader?null:<WeeklyWeather WeeklyWeatherData={WeeklyWeatherData} />}
      </div>
       
    </div>
  );
}

export default Main;
