import Search from "./Search";
import React, { useState } from "react";
import axios from "axios";
import "./Compare.css";
import Loader from "./Loader";

import Weather from "./Weather";
import Navbar from "./Navbar";
function Compare() {
  const API_KEY = "6fb64e2ee63c4e1ab5601828243103";
  const [weatherLocationData, setweatherLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [secondWeatherLocationData, setsecondWeatherLocationData] =
    useState(null);
  const [secondWeatherData, setsecondWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [aqi1, setAqi1] = useState(null);
  const [aqi2, setAqi2] = useState(null);

  const onSearchedCity = (data) => {
    setLoader(true);
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${data}&days=7&aqi=yes&alerts=yes`;
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setWeatherData(response.data.current);
          setweatherLocationData(response.data.location);
          getLonAndLat(data);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();
  };

  const getLonAndLat = async (data) => {
    setLoader(true);
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=1&appid=da946ec49eff7239b0c6b35d73a597cb`;
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.length > 0) {
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
        setAqi1(response.data.list[0].main.aqi);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching weather data:", error);
    }
  };

  const onSearchedSecondCity = (secondData) => {
    setLoader(true);
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${secondData}&days=7&aqi=yes&alerts=yes`;
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setsecondWeatherData(response.data.current);
          setsecondWeatherLocationData(response.data.location);
          getLonAndLat2(secondData);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  };

  const getLonAndLat2 = async (data) => {
    setLoader(true);
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=1&appid=da946ec49eff7239b0c6b35d73a597cb`;
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.length > 0) {
        getAqi2VAlue(response.data[0].lon, response.data[0].lat);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching weather data:", error);
    }
  };

  const getAqi2VAlue = async (lon, lat) => {
    setLoader(true);
    const API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=da946ec49eff7239b0c6b35d73a597cb`;
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.list.length > 0) {
        setAqi2(response.data.list[0].main.aqi);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #4286f4, #373b44), #373b44",
        }}
      >
        <Navbar />
      </div>
      <div className="background d-flex justify-content-center align-items-center">
        {loader ? <Loader /> : null}
        <div>
          {loader ? null : <Search searchedCity={onSearchedCity} />}
          {loader ? null : (
            <Weather
              aqiValue={aqi1}
              weatherData={weatherData}
              weatherLocationData={weatherLocationData}
            />
          )}
        </div>
        <div>
          {loader ? null : <Search searchedCity={onSearchedSecondCity} />}
          {loader ? null : (
            <Weather
              aqiValue={aqi2}
              weatherData={secondWeatherData}
              weatherLocationData={secondWeatherLocationData}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Compare;
