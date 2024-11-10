import { useState, useMemo } from "react";
import { Autocomplete } from "@mui/material";
import states from "../data/states.json";
import { stateToAbbreviation } from "../utils";

const useStateSelect = (initialValue = "") => {
  const [stateValue, setStateValue] = useState(initialValue);
  const [isStateValid, setIsStateValid] = useState(true);

  const stateAbbreviation = useMemo(
    () => stateToAbbreviation(stateValue),
    [stateValue]
  );

  const resetState = () => {
    setStateValue("");
    setIsStateValid(true);
  };

  return {
    StateSelect,
    stateValue,
    resetState,
    stateAbbreviation,
    setStateValue,
    isStateValid,
    setIsStateValid
  };
};


const StateSelect = ({ stateValue, setStateValue, isStateValid, setIsStateValid }) => (
  <Autocomplete
    freeSolo
    value={stateValue}
    id="state-select"
    disableClearable
    options={Object.keys(states)}
    renderInput={(params) => (
      <div ref={params.InputProps.ref} className="">
        <input
          {...params.inputProps}
          type="text"
          className={`form-control ${!isStateValid ? "is-invalid" : ""}`}
          autoComplete="off"
        />
      </div>
    )}
    renderOption={(props, option) => (
      <li {...props} key={option}>
        {option}
      </li>
    )}
    onBlur={(e) => {
      const value = (e.nativeEvent?.target as HTMLInputElement)?.value || "";
      setIsStateValid(value.trim() !== "");
    }}
    onInputChange={(e, value) => {
      setStateValue(value);
    }}
  />
);

export default useStateSelect;
