import { useState, useMemo, useContext } from "react";
import { Autocomplete } from "@mui/material";
import states from "../data/states.json";
import { stateToAbbreviation } from "../utils";
import { AppContext } from "../appContext";

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
    setIsStateValid,
  };
};

const StateSelect = ({
  stateValue,
  setStateValue,
  isStateValid,
  setIsStateValid,
  disabled = false,
}) => {
  const { autoDetect } = useContext(AppContext)[0];
  return (
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
            disabled={disabled}
            // autoComplete="new-password"
            placeholder="Select a state"
            type="text"
            className={`form-control ${
              !isStateValid && !autoDetect ? "is-invalid" : ""
            }`}
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
        setIsStateValid(value in states);
      }}
      onInputChange={(e, value) => {
        setStateValue(value);
      }}
    />
  );
};

export default useStateSelect;
