import React from "react";
import "./style.css";

function HourlyWeather(HourlyData) {
    
  function getDateTimeWithAMPM(dateTimeString) {
    const date = new Date(dateTimeString); 
    const dateTimeWithAMPM = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
    return dateTimeWithAMPM;
  }
  const listItems =
    HourlyData && HourlyData.HourlyData && HourlyData.HourlyData.hour
      ? HourlyData.HourlyData.hour.map((items, index) => (
        <div className="grid-container border-light rounded h-100">
            <p key={index}>{getDateTimeWithAMPM(items.time)}</p>

            <img src={items.condition.icon} alt="" srcSet="" />
            <p>{items.temp_c + " °C"}</p>
          </div>
        ))
      : "";

  return (
    <div className=" box d-flex text-center overflow-auto ms-1 h-100 mt-5">
      {listItems}
    </div>
  );
}

export default HourlyWeather;
