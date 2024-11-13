import React, { useEffect, useState } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import { getFavorites } from "../../model/favoriteList";
import { ICityInfo } from "@/types";
import "bootstrap-icons/font/bootstrap-icons.css";

interface IFavoriteTabProps {
  onClickFavorite: (city: string, state: string) => Promise<void>;
  onDeleteFavorite: (city: string, state: string) => Promise<void>;
}

type IFavoriteTableProps = IFavoriteTabProps & {
  favorites: ICityInfo[];
};

const FavoriteTable = ({
  favorites,
  onClickFavorite,
  onDeleteFavorite,
}: IFavoriteTableProps) => {
  // the table styles are defined in the App.scss file
  return (
    <Container className="table">
      <Row className="table-header">
        <Col xs={2}>#</Col>
        <Col xs={4}>City</Col>
        <Col xs={4}>State</Col>
        <Col xs={4}></Col>
      </Row>
      {favorites.map((favorite: ICityInfo, index: number) => (
        <Row className="table-row" key={index}>
          <Col xs={2}>{index + 1}</Col>
          <Col
            xs={4}
            className="link"
            onClick={() => {
              onClickFavorite(favorite.city, favorite.state);
            }}
          >
            {favorite.city}
          </Col>
          <Col
            xs={4}
            className="link"
            onClick={() => {
              onClickFavorite(favorite.city, favorite.state);
            }}
          >
            {favorite.state}
          </Col>
          <Col xs={2}>
            <i
              className="bi bi-trash-fill"
              onClick={() => {
                onDeleteFavorite(favorite.city, favorite.state);
              }}
              onMouseOver={(e) => {
                e.currentTarget.className = "bi bi-trash";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.className = "bi bi-trash-fill";
              }}
            ></i>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default function FavoriteTab({
  onClickFavorite,
  onDeleteFavorite,
}: IFavoriteTabProps) {
  const [favorites, setFavorites] = useState<ICityInfo[]>([]);

  const fetchFavorites = () => {
    getFavorites().then((favorites) => {
      setFavorites(favorites);
    });
  };

  useEffect(fetchFavorites, []);

  const handleDeleteFavorite = async (city: string, state: string) => {
    await onDeleteFavorite(city, state).then(() => fetchFavorites());
  };

  return (
    <Container>
      {favorites.length === 0 ? (
        <Alert variant="warning">
          <b>Sorry! </b>No records found.
        </Alert>
      ) : (
        <FavoriteTable
          favorites={favorites}
          onClickFavorite={onClickFavorite}
          onDeleteFavorite={handleDeleteFavorite}
        />
      )}
    </Container>
  );
}
