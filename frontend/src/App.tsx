import React, { useCallback, FormEvent, useRef, useState } from "react";
import { AppContext } from "./appContext";
import WeatherSearchForm from "./components/weatherSearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { fetchData } from "./model/fetchData";
import TopTabButtons from "./components/topTabButtons";
import { IFormData, ITabRef } from "./types";
import ResultTab from "./components/resultTab";
import FavoriteTab from "./components/favoriteTab";
import { Alert } from "react-bootstrap";
import { deleteFavorite } from "./model/favoriteList";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";
console.log(BACKEND);

function App() {
  const [activeTab, setActiveTab] = useState("results");
  const topTabButtonsRef = useRef<ITabRef>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [searchStatus, setSearchStatus] = useState<"init" | "success" | "fail">(
    "init"
  );

  const searchWeather = (formData: IFormData) => {
    fetchData(formData)
      .then((data) => {
        const refinedSearchData = {
          ...formData,
          city: data.city,
          state: data.state,
        };
        setFormData(refinedSearchData);
        setSearchStatus("success");
      })
      .catch(() => {
        setSearchStatus("fail");
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

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleSelectFavorite = useCallback(async (city: string, state: string) => {
    const formData = { city, state };
    searchWeather(formData);  // async call
    topTabButtonsRef.current?.setActiveTab("results");
    setActiveTab("results");
  }, []);

  const handleDeleteFavorite = useCallback(async (city: string, state: string) => {
    await deleteFavorite({ city, state });
  }, []);

  return (
    <AppContext.Provider value={formData}>
      <article className="App">
        <WeatherSearchForm onSubmit={submitForm} />
        <TopTabButtons ref={topTabButtonsRef} onTabChange={handleTabChange} />
        <section className="mt-3 w-100">
          {activeTab === "results" &&
            ((searchStatus === "success" && (
              <ResultTab searchStatus={searchStatus} />
            )) ||
              (searchStatus === "fail" && (
                <Alert variant="danger" className="container">
                  An error occurred. Please try again later.
                </Alert>
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
