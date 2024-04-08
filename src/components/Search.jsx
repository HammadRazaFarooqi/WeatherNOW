import React, { useState } from "react";
import CityAutocomplete from "./CityAutocomplete";
import './Search.css'
function OnSearchClick({ searchedCity }) {
  const [searchData, setSearchData] = useState("");

  const onInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const onClickSearch = (event) => {
    console.log(event)
    searchedCity(event);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchedCity(searchData);
    }
  };

  return (
    <div className="input-group mb-3 w-50 mx-auto  ">
     <CityAutocomplete onChange={onClickSearch}/>
      
    </div>
  );
}

export default OnSearchClick;
