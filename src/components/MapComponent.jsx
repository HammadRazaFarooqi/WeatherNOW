import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "./Navbar";
import "./MapComponent.css";

function MapComponent() {
  useEffect(() => {
    const OSM_URL = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const OSM_ATTRIB =
      '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const osmLayer = L.tileLayer(OSM_URL, { attribution: OSM_ATTRIB });

    const WAQI_URL =
      "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_";
    const WAQI_ATTR =
      'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>';
    const waqiLayer = L.tileLayer(WAQI_URL, { attribution: WAQI_ATTR });

    const map = L.map("map").setView([51.505, -0.09], 11);
    map.addLayer(osmLayer).addLayer(waqiLayer);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
    <div className="mb-2"
      style={{
        background: "linear-gradient(to right, #4286f4, #373b44), #373b44",
      }}
    >
      <Navbar />
      </div>

      <div id="map" style={{ height: "86vh", position: 'relative' }} />
      <div className="d-flex ms-2 mt-1" style={{position: 'absolute'}}>
        <span className="me-2">Air Quality Scale</span>
        <span className="good p-2 badge rounded-pill">Good: 0 - 50</span>
        <span className="moderate p-2 badge rounded-pill">Moderate: 51 -100</span>
        <span className="unhealthy_for_sensitive_groups p-2 badge rounded-pill">Unhealthy for Sensitive Groups: 101-150</span>
        <span className="unhealthy p-2 badge rounded-pill">Unhealthy: 151-200</span>
        <span className="very_unhealthy p-2 badge rounded-pill">Very Unhealthy: 201-300</span>
        <span className="hazardous p-2 badge rounded-pill">Hazardous: 300+</span>
      </div>
   
    </>
  );
}

export default MapComponent;
