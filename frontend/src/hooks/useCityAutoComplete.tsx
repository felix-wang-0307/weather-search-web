import { useState, useCallback, useEffect } from "react";
import { Autocomplete, debounce } from "@mui/material";
import { getAutoCompleteList } from "../model/cityAutoComplete";
import { ICityInfo } from "../types";

const useCityAutoComplete = () => {
  const [cityValue, setCityValue] = useState("");
  const [isCityValid, setIsCityValid] = useState(true);
  const [cityOptions, setCityOptions] = useState<ICityInfo[]>([]);

  // Debounce the input change to reduce the number of API calls
  const debouncedFetchCityOptions = useCallback(
    debounce((input) => {
      getAutoCompleteList(input).then((data) => {
        setCityOptions(data);
      });
    }, 300),
    [] // Dependencies are empty so debounce is only created once
  );

  useEffect(() => {
    if (cityValue.trim() !== "") {
      debouncedFetchCityOptions(cityValue);
    } else {
      setCityOptions([]);
    }
  }, [cityValue, debouncedFetchCityOptions]);

  const handleInputChange = (event, newInputValue) => {
    console.log("handleInputChange", newInputValue);
    setCityValue(newInputValue);
  };

  const resetCity = () => {
    setCityValue("");
    setIsCityValid(true);
  };

  return { CityAutoComplete, cityValue, isCityValid, setIsCityValid, handleInputChange, cityOptions, resetCity };
};

const CityAutoComplete = ({
  cityValue,
  cityOptions,
  handleInputChange,
  isCityValid,
  setIsCityValid,
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
  />
);

export { useCityAutoComplete, CityAutoComplete };
