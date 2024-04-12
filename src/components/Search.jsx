import React from "react";
import CityAutocomplete from "./CityAutocomplete";
import './Search.css';
function OnSearchClick({ searchedCity }) {

 

  const onClickSearch = (event) => {
    searchedCity(event);
  };

  

  return (
    <div className="input-group mb-3 w-50 mx-auto  ">
     <CityAutocomplete onChange={onClickSearch}/>
      
    </div>
  );
}

export default OnSearchClick;
