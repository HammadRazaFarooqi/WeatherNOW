import React from "react";

function Weather({ weatherData, weatherLocationData }) {
  
  
  function getDateTimeWithAMPM(dateTimeString) {
    const date = new Date(dateTimeString); 
    const dateTimeWithAMPM = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
    return dateTimeWithAMPM;
  }
  return (
    <div className="WeatherBox w-100 border-dark rounded-4 p-3 mx-5 ">
      <h1 className="d-flex justify-content-center">CURRENT WEATHER</h1>
      <span className="d-flex justify-content-around">
      <h6 className="text-center mb-3 mt-3">
        Local Time: {weatherLocationData ? getDateTimeWithAMPM(weatherLocationData.localtime) : ""}
      </h6>
      <h6 className="text-center mb-3 mt-3">
        Last Updated: {weatherData ? getDateTimeWithAMPM(weatherData.last_updated) : ""}
      </h6>
      </span>
      <div className="d-flex justify-content-around">
        <h3 className="d-flex justify-content-center align-items-center">{weatherLocationData ? weatherLocationData.name +"/" : ""}{weatherLocationData?weatherLocationData.country:''}</h3>
        <h3 className="d-flex justify-content-center align-items-center">{weatherData ? weatherData.temp_c + " °C" : ""}</h3>
        <img
          src={weatherData ? weatherData.condition.icon : ""}
          alt=""
          srcSet=""
        />
      </div>
      <h1 className="d-flex justify-content-center p-3 mx-5 mb-4 mt-3">AIR CONDTION</h1>
      <div className="d-flex justify-content-around">
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
            viewBox="0 0 16 16"
            className="bi bi-cloud mx-2"
          >
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
          </svg>
          Clouds: <br />
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
      </div>
    </div>
  );
}

export default Weather;
