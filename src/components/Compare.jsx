import Search from "./Search";
import React, { useState } from "react";
import axios from "axios";
import "./Compare.css";
import Loader from "./Loader";

import Weather from "./Weather";
function Compare() {
  const API_KEY = "6fb64e2ee63c4e1ab5601828243103";
  const [weatherLocationData, setweatherLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [secondWeatherLocationData, setsecondWeatherLocationData] =
    useState(null);
  const [secondWeatherData, setsecondWeatherData] = useState(null);
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
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  };
  const onSearchedSecondCity = (secondData) => {
    setLoader(true);
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${secondData}&days=7&aqi=no&alerts=no`;
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setsecondWeatherData(response.data.current);
          setsecondWeatherLocationData(response.data.location);
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
    <div className="background d-flex justify-content-center align-items-center">
      {loader ? <Loader /> : null}
      <div>
        {loader ? null : <Search searchedCity={onSearchedCity} />}
        {loader ? null : (
          <Weather
            weatherData={weatherData}
            weatherLocationData={weatherLocationData}
          />
        )}
      </div>
      <div>
        {loader ? null : <Search searchedCity={onSearchedSecondCity} />}
        {loader ? null : (
          <Weather
            weatherData={secondWeatherData}
            weatherLocationData={secondWeatherLocationData}
          />
        )}
      </div>
    </div>
  );
}

export default Compare;
