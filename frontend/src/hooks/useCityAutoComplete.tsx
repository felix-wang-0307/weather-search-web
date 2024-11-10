import { useState, useCallback } from "react";
import { Autocomplete, debounce } from "@mui/material";
import { getAutoCompleteList } from "../model/cityAutoComplete";
import { ICityInfo } from "../types";


const useCityAutoComplete = () => {
  
  const [cityValue, setCityValue] = useState("");
  const [cityOptions, setCityOptions] = useState<ICityInfo[]>([]);
  const [isCityValid, setIsCityValid] = useState(true);

  const CityAutoComplete = useCallback(
    () => (
      <Autocomplete
        freeSolo
        value={cityValue}
        options={cityOptions.map((city) => city.city)}
        id="city-select"
        disableClearable
        renderInput={(params) => (
          <div ref={params.InputProps.ref} className="">
            <input
              {...params.inputProps}
              type="text"
              className={`form-control ${!isCityValid ? "is-invalid" : ""}`}
              autoComplete="off"
            />
          </div>
        )}
        renderOption={(props, option) => {
          const entry = cityOptions.find((city) => city.city === option);
          return (
            <li {...props} key={option}>
              {entry?.city}, {entry?.state}
            </li>
          );
        }}
        onBlur={(e) => {
          const value =
            (e.nativeEvent?.target as HTMLInputElement)?.value || "";
          setIsCityValid(value.trim() !== "");
        }}
        onInputChange={debounce((_, value) => {
          console.log("ONINPUTCHANGE");
          if (value !== cityValue) {
            setCityValue(value);
            if (value.trim() === "") {
              setCityOptions([]);
              return;
            }
            console.log(value);
            getAutoCompleteList(value).then((data) => {
              console.log(data);
              setCityOptions(data);
            });
          }
        }, 300)}
      />
    ),
    [cityValue, isCityValid, cityOptions]
  );

  const resetCity = () => {
    setCityValue("");
    setIsCityValid(true);
  };

  return { CityAutoComplete, cityValue, isCityValid, cityOptions, resetCity };
};

export default useCityAutoComplete;
