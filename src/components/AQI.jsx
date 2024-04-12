import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./AQI.css";

const AQI = () => {
  const [topPollutedCities, setTopPollutedCities] = useState([]);
  const [bottomPollutedCities, setBottomPollutedCities] = useState([]);
  const fetchAQIDataForPakistanCities = async () => {
    const apiKey = "1f9b99ccea241977f3d3806366ba647bbde10aba";
    const cities = [
      "Karachi",
      "Lahore",
      "Okara",
      "Rawalpindi",
      "Islamabad",
      "Hyderabad",
      "Peshawar",
    ];
    const aqiData = [];

    for (const city of cities) {
      const response = await fetch(
        `https://api.waqi.info/feed/${city}/?token=${apiKey}`
      );
      const data = await response.json();
      aqiData.push({ city: city, aqi: data.data.aqi });
    }

    return aqiData;
  };

  // Function to display AQI data in a table format
  const displayAQITable = (aqiData) => {
    aqiData.sort((a, b) => b.aqi - a.aqi); // Sort cities by AQI in descending order
    const top = aqiData.slice(0, 5);
    const bottom = aqiData.reverse().slice(0, 5);
    setTopPollutedCities(top);
    setBottomPollutedCities(bottom);
  };

  // Main function to fetch and display AQI data for Pakistani cities
  const fetchAndDisplayPakistanAQIData = async () => {
    const aqiData = await fetchAQIDataForPakistanCities();
    displayAQITable(aqiData);
  };

  // Call the main function

  function getAQIClass(aqi) {
    if (aqi >= 0 && aqi <= 50) {
      return "good";
    } else if (aqi >= 51 && aqi <= 100) {
      return "moderate";
    } else if (aqi >= 101 && aqi <= 150) {
      return "unhealthy_for_sensitive_groups";
    } else if (aqi >= 151 && aqi <= 200) {
      return "unhealthy";
    } else if (aqi >= 201 && aqi <= 300) {
      return "very_unhealthy";
    } else {
      return "hazardous";
    }
  }
  useEffect(() => {
    fetchAndDisplayPakistanAQIData();
  }, []);

  return (
    <div className="background">
      <div
        style={{
          background: "linear-gradient(to right, #4286f4, #373b44), #373b44",
        }}
      >
        <Navbar />
      </div>
      <div className="text-start d-flex justify-content-around pt-5">
        <div>
          <h2>Top 5 Polluted Cities in Pakistan</h2>
          <ul className="list-unstyled list-group list-group-flush">
            {topPollutedCities.map((city, index) => (
              <li
                className={`list-group-item d-flex justify-content-between align-items-center text-light bg-transparent`}
                key={index}
              >
                {city.city}
                <span
                  className={`badge rounded-pill w-25 bg-light ${getAQIClass(
                    city.aqi
                  )}`}
                >
                  {city.aqi}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Bottom 5 Polluted Cities in Pakistan</h2>
          <ul className="list-unstyled list-group list-group-flush">
            {bottomPollutedCities.map((city, index) => (
              <li
                className={`list-group-item d-flex justify-content-between align-items-center text-light bg-transparent`}
                key={index}
              >
                {city.city}
                <span
                  className={`badge rounded-pill w-25 text-light ${getAQIClass(
                    city.aqi
                  )}`}
                >
                  {city.aqi}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="heading fs-1 text-center bg-transparent mt-5">
        About the Air Quality and Pollution Measurement:
      </p>
      <div className=" container mx-auto">
        <div className="aqiTable">
          <table className=" table ">
            <thead className=" bg-transparent text-light text-center">
              <tr>
                <td>AQI</td>
                <td>Air Pollution Level</td>
                <td>Health Implications</td>
                <td>Cautionary Statement (for PM2.5)</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="aqiwtxt bg-transparent text-light" nowrap="true">
                  <span className={`badge rounded-pill w-100 good`}>
                    0 - 50
                  </span>
                </td>
                <td className="aqiwtxt bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 good`}>Good</span>
                </td>
                <td className="aqiwtxt bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 good`}>
                    Air pollution poses little or no risk
                  </span>
                </td>
                <td className="aqiwtxt bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 good`}>None</span>
                </td>
              </tr>
              <tr className="aqibtxt">
                <td className="aqibtxt bg-transparent text-light" nowrap="true">
                  <span
                    className={`badge rounded-pill w-100 moderate text-success`}
                  >
                    51 -100
                  </span>
                </td>
                <td className="aqibtxt bg-transparent text-light">
                  <span
                    className={`badge rounded-pill w-100 moderate text-success`}
                  >
                    Moderate
                  </span>
                </td>
                <td className="aqibtxt bg-transparent text-light">
                  <span
                    className={`badge rounded-pill w-100 moderate text-success`}
                  >
                    Air quality is acceptable.
                  </span>
                </td>
                <td className="aqibtxt bg-transparent text-light">
                  <span
                    className={`badge rounded-pill w-100 moderate text-success`}
                  >
                    People with respiratory disease should limit prolonged
                    outdoor exertion.
                  </span>
                </td>
              </tr>
              <tr>
                <td className="aqibtxt bg-transparent text-light" nowrap="true">
                  <span
                    className={`badge rounded-pill w-100 unhealthy_for_sensitive_groups text-danger`}
                  >
                    101-150
                  </span>
                </td>
                <td className="aqibtxt bg-transparent text-light">
                  <span
                    className={`badge rounded-pill w-100 unhealthy_for_sensitive_groups text-danger`}
                  >
                    Unhealthy for Sensitive Groups
                  </span>
                </td>
                <td className="aqibtxt bg-transparent text-light">
                  <span
                    className={`badge rounded-pill w-100 unhealthy_for_sensitive_groups text-danger`}
                  >
                    Members of sensitive groups may experience health effects.
                  </span>
                </td>
                <td className="aqibtxt bg-transparent text-light">
                  <span
                    className={`badge rounded-pill w-100 unhealthy_for_sensitive_groups text-danger`}
                  >
                    People with respiratory disease should limit prolonged
                    outdoor exertion.
                  </span>
                </td>
              </tr>
              <tr>
                <td className="aqiwtxt  bg-transparent text-light" nowrap="true">
                  <span className={`badge rounded-pill w-100 unhealthy`}>
                    151-200
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 unhealthy`}>
                    Unhealthy
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 unhealthy`}>
                    Everyone may begin to experience health effects.
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 unhealthy`}>
                    People with respiratory disease should avoid prolonged
                    outdoor exertion.
                  </span>
                </td>
              </tr>
              <tr>
                <td className="aqiwtxt  bg-transparent text-light" nowrap="true">
                  <span className={`badge rounded-pill w-100 very_unhealthy`}>
                    201-300
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 very_unhealthy`}>
                    Very Unhealthy
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 very_unhealthy`}>
                    Health warnings of emergency conditions.
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 very_unhealthy`}>
                    People with respiratory disease should avoid all outdoor
                    exertion.
                  </span>
                </td>
              </tr>
              <tr>
                <td className="aqiwtxt  bg-transparent text-light" nowrap="true">
                  <span className={`badge rounded-pill w-100 hazardous`}>
                    300+
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 hazardous`}>
                    Hazardous
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 hazardous`}>
                    Health alert: everyone may experience more serious health
                    effects
                  </span>
                </td>
                <td className="aqiwtxt  bg-transparent text-light">
                  <span className={`badge rounded-pill w-100 hazardous`}>
                    Everyone should avoid all outdoor exertion
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AQI;
