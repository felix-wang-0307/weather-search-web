import React, { useCallback, FormEvent } from "react";
import WeatherSearchForm from "./components/weatherSearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { IFormData } from "./types";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";

function App() {
  const submitForm = useCallback(((event: FormEvent) => {
    event.preventDefault();
    const formData: IFormData = {
      street: event.target[0].value,
      city: event.target[1].value,
      state: event.target[2].value,
      autoDetect: event.target[3].checked,
    };
    console.log(formData);
  }), []);

  return (
    <div className="App">
      <WeatherSearchForm onSubmit={ submitForm } />
    </div>
  );
}

export default App;
