import React, { useCallback, FormEvent, useRef } from "react";
import WeatherSearchForm from "./components/weatherSearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { fetchData } from "./model/fetchData";
import TopTabButtons from "./components/topTabButtons";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";
console.log(BACKEND);

function App() {
  const submitForm = useCallback((event: FormEvent) => {
    event.preventDefault();
    const formData = {
      street: event.target[0].value,
      city: event.target[1].value,
      state: event.target[2].value,
      autoDetect: event.target[3].checked,
    };
    fetchData(formData).then((data) => {
      console.log(data);
    });
  }, []);

  const topTabButtonsRef = useRef(null);

  return (
    <article className="App">
      <WeatherSearchForm onSubmit={submitForm} />
      <TopTabButtons ref={topTabButtonsRef}/>
    </article>
  );
}

export default App;
