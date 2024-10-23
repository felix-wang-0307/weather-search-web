import React, { useState, useEffect } from 'react';

const backend = "https://weather-search-web-571.wn.r.appspot.com/";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(backend + "test?param1=Hello&param2=World")
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data.params));
        setData(JSON.stringify(data.params));  // Convert the object to a string
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello World From React 18! Shit!!</h1>
      {data ? <h2>{data}</h2> : <p>Loading...</p>}
    </div>
  );
}

export default App;
