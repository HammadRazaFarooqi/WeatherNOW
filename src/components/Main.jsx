import axios from "axios";
import React, { useEffect, useState } from "react";
import HourlyWeather from "./HourlyWeather";
import Loader from "./Loader";
import Navbar from "./Navbar";
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
  const [aqi, setAqi] = useState(null);

  const onSearchedCity = async (data) => {
    setLoader(true);
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${data}&days=7&aqi=yes&alerts=yes`;
    try {
      const response = await axios.get(API_URL);
      if (response.data) {
        getLonAndLat(data);
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

  const getLonAndLat = async (data) => {
    setLoader(true);
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=1&appid=da946ec49eff7239b0c6b35d73a597cb`;
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.length > 0) {
        console.log(response.data[0].lat);
        console.log(response.data[0].lon);
        getAqiVAlue(response.data[0].lon, response.data[0].lat);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching weather data:", error);
    }
  };

  const getAqiVAlue = async (lon, lat) => {
    setLoader(true);
    const API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=da946ec49eff7239b0c6b35d73a597cb`;
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.list.length > 0) {
        console.log(response.data.list[0].main.aqi);
        setAqi(response.data.list[0].main.aqi);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching weather data:", error);
    }
  };

  // Call onSearchedCity with default city "Lahore" when the component mounts
  useEffect(() => {
    onSearchedCity("Lahore")
  }, []);

  return (
    <div className="background py-3 ">
      {loader ? <Loader /> : null}
      {loader ? null : <Navbar />}

      <div className="d-flex">
        {loader ? null : <Search searchedCity={onSearchedCity} />}
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-around flex-column w-50">
          {loader ? null : (
            <Weather
              aqiValue={aqi}
              weatherData={weatherData}
              weatherLocationData={weatherLocationData}
            />
          )}
          {loader ? null : <HourlyWeather HourlyData={HourlyData} />}
        </div>
        {loader ? null : (
          <WeeklyWeather WeeklyWeatherData={WeeklyWeatherData} />
        )}
      </div>
    </div>
  );
}

export default Main;
