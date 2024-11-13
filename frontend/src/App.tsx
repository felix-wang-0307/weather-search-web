import React, { useCallback, FormEvent, useRef, useState } from "react";
import { AppContext } from "./appContext";
import WeatherSearchForm from "./components/weatherSearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { fetchData } from "./model/fetchData";
import TopTabButtons from "./components/topTabButtons";
import { IFormData, ITabRef, IWeatherData } from "./types";
import ResultTab from "./components/resultTab";
import FavoriteTab from "./components/favoriteTab";
import { Alert, Container, ProgressBar } from "react-bootstrap";
import { deleteFavorite } from "./model/favoriteList";

function SimulatedProgressBar() {
  const [progress, setProgress] = useState(20);

  setInterval(() => {
    setProgress((prevProgress) => {
      if (prevProgress >= 99) {
        return 99;
      }
      return prevProgress + Math.floor(Math.random() * 8);
    });
  }, 300);

  return <ProgressBar animated now={progress} />;
}

function App() {
  const [activeTab, setActiveTab] = useState("results");
  const topTabButtonsRef = useRef<ITabRef>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [searchStatus, setSearchStatus] = useState<
    "init" | "success" | "failed" | "processing"
  >("init");
  const [weatherData, setWeatherData] = useState<IWeatherData>({});

  const searchWeather = (formData: IFormData) => {
    // Simulate a processing state before fetching the data
    setSearchStatus("processing");
    fetchData(formData)
      .then((data) => {
        // Manipulate the data before setting it
        const refinedSearchData = {
          ...formData,
          city: data.city,
          state: data.state,
        };
        setFormData(refinedSearchData);
        setWeatherData(data.weather);
        setSearchStatus("success");
      })
      .catch(() => {
        setSearchStatus("failed");
      });
  };

  const submitForm = useCallback((event: FormEvent) => {
    event.preventDefault();
    const formData = {
      street: event.target[0].value,
      city: event.target[1].value,
      state: event.target[2].value,
      autoDetect: event.target[3].checked,
    };
    searchWeather(formData);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({});
    setWeatherData({});
    setSearchStatus("init");
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleSelectFavorite = useCallback(
    async (city: string, state: string) => {
      const formData = { city, state };
      searchWeather(formData); // async call
      topTabButtonsRef.current?.setActiveTab("results");
      setActiveTab("results");
    },
    []
  );

  const handleDeleteFavorite = useCallback(
    async (city: string, state: string) => {
      await deleteFavorite({ city, state });
    },
    []
  );

  return (
    <AppContext.Provider value={[formData, weatherData]}>
      <article className="App">
        <WeatherSearchForm onSubmit={submitForm} onReset={resetForm} />
        <TopTabButtons ref={topTabButtonsRef} onTabChange={handleTabChange} />
        <section className="mt-3 w-100">
          {activeTab === "results" &&
            ((searchStatus === "success" && (
              <ResultTab />
            )) ||
              (searchStatus === "failed" && (
                <Alert variant="danger" className="container">
                  An error occurred. Please try again later.
                </Alert>
              )) ||
              (searchStatus === "processing" && (
                <Container>
                  <SimulatedProgressBar />
                </Container>
              )))}
          {activeTab === "favorites" && (
            <FavoriteTab
              onClickFavorite={handleSelectFavorite}
              onDeleteFavorite={handleDeleteFavorite}
            />
          )}
        </section>
      </article>
    </AppContext.Provider>
  );
}

export default App;
