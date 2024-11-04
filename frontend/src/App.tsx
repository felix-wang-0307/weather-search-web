import React from 'react';
import WeatherSearchForm from './components/weatherSearchForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const backend = "https://weather-search-web-571.wn.r.appspot.com/";

function App() {
  return (
    <div className="App">
      <WeatherSearchForm />
    </div>
  );
}

export default App;
