import React, { useState, useEffect } from "react";
import { getBooks, getMovies } from "../../Functions/UserFunctions";
import { Container, Row, Col } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";

import "./ratings.css";

export default function Ratings() {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getBooks().then(res => {
      if (!res.error && !res.result) {
        setBooks(res);
      } else {
        alert("error");
      }
    });
    getMovies().then(res => {
      if (!res.error && !res.result) {
        setMovies(res);
      } else {
        alert("error");
      }
    });
  }, []);

  let bookRatings = books.map(book => {
    return (
      <Row>
        <Col>
          <p>{book.title}</p>
        </Col>
        <Col>
          <RatingView ratingValue={book.rating} />
        </Col>
        <hr />
      </Row>
    );
  });

  let movieRatings = movies.map(movie => {
    return (
      <Row>
        <Col>
          <p>{movie.title}</p>
        </Col>
        <Col>
          <RatingView ratingValue={movie.rating} />
        </Col>
        <hr />
      </Row>
    );
  });

  return (
    <Container>
      <Row>
        <Col className="ratings-title">
          <h1>Your Ratings</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Book Ratings</h1>
        </Col>
      </Row>
      {bookRatings}
      <Row>
        <Col>
          <h1>Movie Ratings</h1>
        </Col>
      </Row>
      {movieRatings}
    </Container>
  );
}
