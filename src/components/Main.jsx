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

  const calculateNowCast = (data, value) => {
    const concentrations = []; // Array to store hourly concentrations

    // Extract PM2.5 or PM10 concentrations for the last 12 hours
    for (let hour = 1; hour <= 12; hour++) {
      concentrations.push(data[hour][value]); // Replace pm2_5 with pm10 if needed
    }

    // Step 1: Compute Concentrations Range
    const range = Math.max(...concentrations) - Math.min(...concentrations);

    // Step 2: Calculate Scaled Rate of Change
    const maxConcentration = Math.max(...concentrations);
    const scaledRate = range / maxConcentration;

    // Step 3: Compute Weight Factor
    let weightFactor = 1 - scaledRate;
    if (weightFactor < 0.5) {
      weightFactor = 0.5;
    }

    // Step 4: Calculate Weighted Concentrations
    let nowCast = 0;
    for (let i = 0; i < concentrations.length; i++) {
      nowCast += concentrations[i] * Math.pow(weightFactor, i);
    }

    // Step 5: Compute NowCast
    const sumWeightFactors = Array.from(
      { length: concentrations.length },
      (_, i) => Math.pow(weightFactor, i)
    ).reduce((acc, val) => acc + val, 0);
    nowCast /= sumWeightFactors;

    return nowCast;
  };

  const onSearchedCity = async (data) => {
    setLoader(true);
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${data}&days=7&aqi=yes&alerts=yes`;
    try {
      const response = await axios.get(API_URL);
      if (response.data) {
        setWeatherData(response.data.current);
        setweatherLocationData(response.data.location);
        setWeeklyWeatherData(response.data.forecast);
        setHourlyData(response.data.forecast.forecastday[0]);
        setLoader(false);
        const hourlyData = {
          1: { ...response.data.forecast.forecastday[0].hour[0].air_quality },
          2: { ...response.data.forecast.forecastday[0].hour[1].air_quality },
          3: { ...response.data.forecast.forecastday[0].hour[2].air_quality },
          4: { ...response.data.forecast.forecastday[0].hour[3].air_quality },
          5: { ...response.data.forecast.forecastday[0].hour[4].air_quality },
          6: { ...response.data.forecast.forecastday[0].hour[5].air_quality },
          7: { ...response.data.forecast.forecastday[0].hour[6].air_quality },
          8: { ...response.data.forecast.forecastday[0].hour[7].air_quality },
          9: { ...response.data.forecast.forecastday[0].hour[8].air_quality },
          10: { ...response.data.forecast.forecastday[0].hour[9].air_quality },
          11: { ...response.data.forecast.forecastday[0].hour[10].air_quality },
          12: { ...response.data.forecast.forecastday[0].hour[11].air_quality },
          13: { ...response.data.forecast.forecastday[0].hour[12].air_quality },
          14: { ...response.data.forecast.forecastday[0].hour[13].air_quality },
          15: { ...response.data.forecast.forecastday[0].hour[14].air_quality },
          16: { ...response.data.forecast.forecastday[0].hour[15].air_quality },
          17: { ...response.data.forecast.forecastday[0].hour[16].air_quality },
          18: { ...response.data.forecast.forecastday[0].hour[17].air_quality },
          19: { ...response.data.forecast.forecastday[0].hour[18].air_quality },
          20: { ...response.data.forecast.forecastday[0].hour[19].air_quality },
          21: { ...response.data.forecast.forecastday[0].hour[20].air_quality },
          22: { ...response.data.forecast.forecastday[0].hour[21].air_quality },
          23: { ...response.data.forecast.forecastday[0].hour[22].air_quality },
          24: { ...response.data.forecast.forecastday[0].hour[23].air_quality },
        };
        console.log("hourlyData:", hourlyData);
        // Usage
        const nowCastPM25 = calculateNowCast(hourlyData, 'pm2_5');
        const nowCastPM10 = calculateNowCast(hourlyData, 'pm10');
        setAqi(((nowCastPM25+nowCastPM10)/1.5).toFixed(2));
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    onSearchedCity("Lahore");
    // eslint-disable-next-line
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
