import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar bg-transparent text-light navbar-expand-lg ">
        <div className="container-fluid">
          <Link to="/">
            <button
              className="btn navbar-brand bg-transparent text-light mx-3"
              type="submit"
              id="button-addon2"
            >
              WeatherNow
            </button>
          </Link>

          
            <ul className="navbar-nav">
              <Link to="/">
                <button
                  className="btn navbar-brand bg-transparent text-light "
                  type="submit"
                  id="button-addon2"
                >
                  Home
                </button>
              </Link>
              <Link to="/aqi">
                <button
                  className="btn navbar-brand bg-transparent text-light "
                  type="submit"
                  id="button-addon2"
                >
                  AQI
                </button>
              </Link>
              <Link to="/compare">
                <button
                  className="btn navbar-brand bg-transparent text-light "
                  type="submit"
                  id="button-addon2"
                >
                  Compare
                </button>
              </Link>
              <Link to="/map">
                <button
                  className="btn navbar-brand bg-transparent text-light "
                  type="submit"
                  id="button-addon2"
                >
                  Map
                </button>
              </Link>
            </ul>
          </div>
        
      </nav>
    </div>
  );
}

export default Navbar;
