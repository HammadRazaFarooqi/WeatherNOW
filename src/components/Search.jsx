import React, { useState } from "react";

function OnSearchClick({ searchedCity }) {
  const [searchData, setSearchData] = useState("");

  const onInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const onClickSearch = () => {
    searchedCity(searchData);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchedCity(searchData);
    }
  };

  return (
    <div className="input-group mb-3 w-50 mx-auto  ">
      <input
        type="text"
        className="form-control "
        placeholder="Enter City Name"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        onChange={onInputChange}
        onKeyDown={onKeyPress} 
      />
      <button
        className="btn btn-light mx-3"
        type="button"
        id="button-addon2"
        onClick={onClickSearch}
      >
        Search
      </button>
    </div>
  );
}

export default OnSearchClick;
