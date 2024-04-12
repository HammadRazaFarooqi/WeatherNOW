import React, { useEffect, useState } from "react";

function Weather({ weatherData, weatherLocationData, aqiValue }) {
  const [overallAqi, setOverallAqi] = useState(0.0);

  useEffect(() => {
    // Calculate overall AQI when weather data changes
    const calculateAQI = () => {
      // Your AQI calculation logic here...
      const pm25Concentration = weatherData
        ? weatherData.air_quality.pm2_5
        : 0.0;
      const pm10Concentration = weatherData
        ? weatherData.air_quality.pm10
        : 0.0;
      const coConcentration = weatherData ? weatherData.air_quality.co : 0.0;
      const no2Concentration = weatherData ? weatherData.air_quality.no2 : 0.0;
      const o3Concentration = weatherData ? weatherData.air_quality.o3 : 0.0;
      const so2Concentration = weatherData ? weatherData.air_quality.so2 : 0.0;

      // Your AQI calculation logic here...
      const pm25AQI = calculateAQIForPollutant(
        pm25Concentration,
        pm25.breakpoints
      );
      const pm10AQI = calculateAQIForPollutant(
        pm10Concentration,
        pm10.breakpoints
      );
      const coAQI = calculateAQIForPollutant(coConcentration, co.breakpoints);
      const no2AQI = calculateAQIForPollutant(
        no2Concentration,
        no2.breakpoints
      );
      const o3AQI = calculateAQIForPollutant(o3Concentration, o3.breakpoints);
      const so2AQI = calculateAQIForPollutant(
        so2Concentration,
        so2.breakpoints
      );

      // Calculate overall AQI
      const overallAQI = Math.max(
        pm25AQI,
        pm10AQI,
        coAQI,
        no2AQI,
        o3AQI,
        so2AQI
      );
      setOverallAqi(overallAQI);
    };

    calculateAQI();
  }, [weatherData]);

  const calculateAQIForPollutant = (concentration, breakpoints) => {
    let AQI = 0;

    // Find the appropriate AQI category based on the concentration
    for (let i = 0; i < breakpoints.length; i++) {
      if (
        concentration >= breakpoints[i].low &&
        concentration <= breakpoints[i].high
      ) {
        // Linear interpolation to calculate AQI within the category range
        AQI =
          ((breakpoints[i].AQI_high - breakpoints[i].AQI_low) /
            (breakpoints[i].high - breakpoints[i].low)) *
            (concentration - breakpoints[i].low) +
          breakpoints[i].AQI_low;
        break;
      }
    }

    return AQI;
  };

  function getDateTimeWithAMPM(dateTimeString) {
    const date = new Date(dateTimeString);
    const dateTimeWithAMPM = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return dateTimeWithAMPM;
  }
  const calculateAQI = (concentration, breakpoints) => {
    let AQI = 0;

    // Find the appropriate AQI category based on the concentration
    for (let i = 0; i < breakpoints.length; i++) {
      if (
        concentration >= breakpoints[i].low &&
        concentration <= breakpoints[i].high
      ) {
        // Linear interpolation to calculate AQI within the category range
        AQI =
          ((breakpoints[i].AQI_high - breakpoints[i].AQI_low) /
            (breakpoints[i].high - breakpoints[i].low)) *
            (concentration - breakpoints[i].low) +
          breakpoints[i].AQI_low;
        break;
      }
    }

    return AQI;
  };

  const calculateOverallAQI = (pollutants) => {
    let overallAQI = 0;

    // Iterate through each pollutant and calculate its AQI
    pollutants.forEach((pollutant) => {
      const AQI = calculateAQI(pollutant.concentration, pollutant.breakpoints);
      // Update overall AQI if AQI for this pollutant is higher
      overallAQI = Math.max(overallAQI, AQI);
    });

    return overallAQI;
  };

  const pm25 = {
    concentration: weatherData ? weatherData.air_quality.pm2_5 : 0.0,
    breakpoints: [
      { low: 0.0, high: 12.0, AQI_low: 0, AQI_high: 50 },
      { low: 12.1, high: 35.4, AQI_low: 51, AQI_high: 100 },
      // Add more breakpoints as needed
    ],
  };

  const pm10 = {
    concentration: weatherData ? weatherData.air_quality.pm10 : 0.0,
    breakpoints: [
      { low: 0.0, high: 54.0, AQI_low: 0, AQI_high: 50 },
      { low: 54.1, high: 154.0, AQI_low: 51, AQI_high: 100 },
      // Add more breakpoints as needed
    ],
  };
  const co = {
    concentration: weatherData ? weatherData.air_quality.co : 0.0, // Example concentration value for CO
    breakpoints: [
      { low: 0.0, high: 4.4, AQI_low: 0, AQI_high: 50 },
      { low: 4.5, high: 9.4, AQI_low: 51, AQI_high: 100 },
      // Add more breakpoints as needed
    ],
  };
  const no2 = {
    concentration: weatherData ? weatherData.air_quality.no2 : 0.0, // Example concentration value for NO2
    breakpoints: [
      { low: 0.0, high: 53.0, AQI_low: 0, AQI_high: 50 },
      { low: 53.1, high: 100.0, AQI_low: 51, AQI_high: 100 },
      // Add more breakpoints as needed
    ],
  };
  const o3 = {
    concentration: weatherData ? weatherData.air_quality.o3 : 0.0, // Example concentration value for O3
    breakpoints: [
      { low: 0.0, high: 55.0, AQI_low: 0, AQI_high: 50 },
      { low: 55.1, high: 70.0, AQI_low: 51, AQI_high: 100 },
      // Add more breakpoints as needed
    ],
  };
  const so2 = {
    concentration: weatherData ? weatherData.air_quality.so2 : 0.0, // Example concentration value for SO2
    breakpoints: [
      { low: 0.0, high: 35.0, AQI_low: 0, AQI_high: 50 },
      { low: 35.1, high: 75.0, AQI_low: 51, AQI_high: 100 },
      // Add more breakpoints as needed
    ],
  };
  const aqi = calculateOverallAQI([pm25, pm10, co, no2, o3, so2]);
  return (
    <div className="WeatherBox w-100 border-dark rounded-4 p-3 mx-5 ">
      <h1 className="d-flex justify-content-center">CURRENT WEATHER</h1>
      <span className="d-flex justify-content-around">
        <h6 className="text-center mb-3 mt-3">
          Local Time:{" "}
          {weatherLocationData
            ? getDateTimeWithAMPM(weatherLocationData.localtime)
            : ""}
        </h6>
        <h6 className="text-center mb-3 mt-3">
          Last Updated:{" "}
          {weatherData ? getDateTimeWithAMPM(weatherData.last_updated) : ""}
        </h6>
      </span>
      <div className="d-flex justify-content-around">
        <h3 className="d-flex justify-content-center align-items-center">
          {weatherLocationData ? weatherLocationData.name + "/" : ""}
          {weatherLocationData ? weatherLocationData.country : ""}
        </h3>
        <h3 className="d-flex justify-content-center align-items-center">
          {weatherData ? weatherData.temp_c + " °C" : ""}
        </h3>
        <img
          src={weatherData ? weatherData.condition.icon : ""}
          alt=""
          srcSet=""
        />
      </div>
      <h1 className="d-flex justify-content-center p-3 mx-5 mb-4 mt-3">
        AIR CONDTION
      </h1>
      <div className="d-flex justify-content-around ">
        <p className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mx-1 bi bi-thermometer-half"
          >
            <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
            <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
          </svg>
          Feels Like: <br />
          {weatherData ? weatherData.feelslike_c + " °C" : ""}
        </p>
        <p className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="bi bi-wind mx-2"
          >
            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
          </svg>
          Wind: <br />
          {weatherData ? weatherData.wind_mph + " mph" : ""}
        </p>
        <p className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-brightness-high mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
          </svg>
          Weather: <br />
          {weatherData ? weatherData.condition.text : ""}
        </p>
        <p className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="bi bi-moisture mx-2"
          >
            <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
          </svg>
          Humidity: <br /> {weatherData ? weatherData.humidity + " (g/m3)" : ""}
        </p>
        <p
          className="text-center "
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-custom-class="custom-tooltip"
          data-bs-title="This top tooltip is themed via CSS variables."
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cloud-sun mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.5 3.5 0 0 1 7 8m4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z" />
            <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
          </svg>
          AQI: <br /> {aqiValue}
        </p>
      </div>
      
      {/* <div className="d-flex ms-2 mt-3 " style={{position: 'absolute'}}>
        <span className="me-2">Air Quality Level:</span>
        <span className="border p-2 badge rounded-pill me-3">1: Good</span>
        <span className="border p-2 badge rounded-pill me-3">2: Fair</span>
        <span className="border p-2 badge rounded-pill me-3">3: Moderate</span>
        <span className="border p-2 badge rounded-pill me-3">4: Poor</span>
        <span className="border p-2 badge rounded-pill me-3">5: Very Poor</span>
      </div> */}
    </div>
  );
}

export default Weather;
