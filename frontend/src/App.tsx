import React, {
  useCallback,
  FormEvent,
  useRef,
  useState
} from "react";
import { AppContext } from "./appContext";
import WeatherSearchForm from "./components/weatherSearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { fetchData } from "./model/fetchData";
import TopTabButtons from "./components/topTabButtons";
import { IFormData, ITabRef } from "./types";
import ResultTab from "./components/resultTab";
import FavoriteTab from "./components/favoriteTab";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";
console.log(BACKEND);

function App() {
  const [activeTab, setActiveTab] = useState("results");
  const topTabButtonsRef = useRef<ITabRef>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [searchStatus, setSearchStatus] = useState<"init" | "success" | "fail">(
    "init"
  );

  const submitForm = useCallback((event: FormEvent) => {
    event.preventDefault();
    const formData = {
      street: event.target[0].value,
      city: event.target[1].value,
      state: event.target[2].value,
      autoDetect: event.target[3].checked,
    };
    fetchData(formData)
      .then((data) => {
        const refinedSearchData = {
          ...formData,
          city: data.city,
          state: data.state,
        }
        setFormData(refinedSearchData);
        setSearchStatus("success");
        console.log(data);
      })
      .catch(() => {
        setSearchStatus("fail");
      });
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <AppContext.Provider value={formData}>
      <article className="App">
        <WeatherSearchForm onSubmit={submitForm} />
        <TopTabButtons ref={topTabButtonsRef} onTabChange={handleTabChange} />
        <section className="mt-3">
        {searchStatus === "success" &&
          (activeTab === "results" ? <ResultTab searchStatus={searchStatus}/> : <FavoriteTab />)}
        </section>
      </article>
    </AppContext.Provider>
  );
}

export default App;
