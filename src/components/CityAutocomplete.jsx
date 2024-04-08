import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import citiesData from '../asset/cities.json';
import Form from 'react-bootstrap/Form';

function CityAutocomplete(props) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    return citiesData.filter(city =>
      `${city.name}, ${city.country}`.toLowerCase().startsWith(inputValueLowerCase)
    );
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {`${suggestion.name}, ${suggestion.country}`}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(`${suggestion.name}, ${suggestion.country}`);
    console.log(suggestion)
    props.onChange(suggestion.name);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && suggestions.length > 0) {
      setValue(`${suggestions[0].name}, ${suggestions[0].country}`);
    }
  };

  const inputProps = {
    placeholder: 'Enter a city',
    value,
    onChange: onChange,
    onKeyDown: onKeyDown
  };

  return (
    <Form>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => `${suggestion.name}, ${suggestion.country}`}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    </Form>
  );
}

export default CityAutocomplete;
