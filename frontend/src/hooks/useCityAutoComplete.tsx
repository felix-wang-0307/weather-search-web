import { useState, useCallback, useEffect } from "react";
import { Autocomplete, debounce } from "@mui/material";
import { getAutoCompleteList } from "../model/cityAutoComplete";
import { ICityInfo } from "../types";

const useCityAutoComplete = () => {
  const [cityValue, setCityValue] = useState("");
  const [cityStateValue, setCityStateValue] = useState("");
  const [isCityValid, setIsCityValid] = useState(true);
  const [cityOptions, setCityOptions] = useState<ICityInfo[]>([]);

  // Debounce the input change to reduce the number of API calls
  const debouncedFetchCityOptions = useCallback(debounce((input) => {
    getAutoCompleteList(input).then((data) => {
      setCityOptions(data);
    });
  }, 300), []);

  useEffect(() => {
    if (cityValue.trim() !== "") {
      debouncedFetchCityOptions(cityValue);
    } else {
      setCityOptions([]);
    }
  }, [cityValue, debouncedFetchCityOptions]);

  const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    setCityValue(newInputValue);
  };

  const resetCity = () => {
    setCityValue("");
    setIsCityValid(true);
  };

  // The hook returns an object with the following properties
  return {
    // The following properties are used by WeatherSearchForm
    CityAutoComplete,
    resetCity,
    cityStateValue,
    // The following properties are used by CityAutoComplete
    cityValue,
    cityOptions,
    handleInputChange,
    isCityValid,
    setIsCityValid,
    setCityStateValue
  };
};

const CityAutoComplete = ({
  cityValue,
  cityOptions,
  handleInputChange,
  isCityValid,
  setIsCityValid,
  setCityStateValue
}) => (
  <Autocomplete
    freeSolo
    value={cityValue}
    options={cityOptions}
    getOptionKey={(option) =>
      typeof option === "string" ? option : option.city + ", " + option.state
    }
    getOptionLabel={(option) =>
      typeof option === "string" ? option : option.city
    }
    id="city-select"
    disableClearable
    renderInput={(params) => (
      <div ref={params.InputProps.ref} className="">
        <input
          {...params.inputProps}
          type="text"
          className={`form-control ${!isCityValid ? "is-invalid" : ""}`}
        />
      </div>
    )}
    renderOption={(props, option) => {
      const key = option.city + ", " + option.state;
      return (
        <li {...props} key={key}>
          {key}
        </li>
      );
    }}
    onBlur={(e) => {
      const value = (e.nativeEvent?.target as HTMLInputElement)?.value || "";
      setIsCityValid(value.trim() !== "");
    }}
    onInputChange={handleInputChange}
    onChange={(e, value: ICityInfo) => setCityStateValue(value.state)}
  />
);

export { useCityAutoComplete, CityAutoComplete };
