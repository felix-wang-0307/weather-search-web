import { AppContext } from "../../appContext";
import React, { useContext, useEffect, useMemo } from "react";
import { Button, Container } from "react-bootstrap";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../../model/favoriteList";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./resultHeader.scss";
import { ICityInfo } from "@/types";

interface IResultHeaderProps {
  goToDetails: (date: string) => void;
}

export const ResultHeader = ({ goToDetails }: IResultHeaderProps) => {
  const [{ city, state }, weatherData] = useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const firstDay = useMemo(() => {
    const dailyWeather = weatherData.timelines?.find((timeline) => {
      return timeline.timestep === "1d";
    });
    return dailyWeather?.intervals[0].startTime;
  }, [weatherData]);

  useEffect(() => {
    getFavorites().then((favorites) => {
      setIsFavorite(
        favorites.some(
          (favorite) => favorite.city === city && favorite.state === state
        )
      );
    });
  }, [city, state]);

  const handleAddFavorite = () => {
    addFavorite({ city, state } as ICityInfo)
      .then(() => setIsFavorite(true))
      .catch(() => {
        alert("Failed to add favorite");
      });
  };

  const handleDeleteFavorite = () => {
    deleteFavorite({ city, state } as ICityInfo)
      .then(() => setIsFavorite(false))
      .catch(() => {
        alert("Failed to delete favorite");
      });
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      handleDeleteFavorite();
    } else {
      handleAddFavorite();
    }
  };

  return (
    <Container>
      <Container className="d-flex justify-content-center">
        <h3 className="title">
          Forecast at {city}, {state}
        </h3>
      </Container>
      <Container className="mt-3 d-flex justify-content-end">
        <Button
          variant="secondary"
          className={`white-button favorite ${
            isFavorite ? "is-favorite" : "not-favorite"
          }`}
          onClick={toggleFavorite}
        >
          {!isFavorite && <i className="bi bi-star"></i>}
          {isFavorite && (
            <i
              className="bi bi-star-fill"
              // style={{ color: "#ffff54", WebkitTextStroke: "1px #000" }}
            ></i>
          )}
        </Button>
        <Button
          variant="light"
          className="go-to-detail"
          onClick={() => firstDay && goToDetails(firstDay)}
        >
          <span>Details</span>
          <i className="bi bi-chevron-right"></i>
        </Button>
      </Container>
    </Container>
  );
};
