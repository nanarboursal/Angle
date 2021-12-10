import React, { useState, useEffect } from "react";
import { getBooks, getMovies } from "../../Functions/UserFunctions";
import { Container, Row, Col, FormGroup, Label, Input, Form, Button } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";

import "./ratings.css";

export default function Ratings() {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [ratedAllBooks, setRatedAllBooks] = useState([]);
  const [ratedAllMovies, setRatedAllMovies] = useState([]);

  useEffect(() => {
    getBooks().then(res => {
      if (!res.error && !res.result) {
        setBooks(res);
        setRatedAllBooks(res);
      } else {
        alert("error");
      }
    });
    getMovies().then(res => {
      if (!res.error && !res.result) {
        setMovies(res);
        setRatedAllMovies(res);
      } else {
        alert("error");
      }
    });
  }, []);

  let bookRatings = books.map(book => {
    return (
      <Row>
        <Col>
          <p style={{ fontStyle: "italic" }}>{book.title}</p>
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
          <p style={{ fontStyle: "italic" }}>{movie.title}</p>
        </Col>
        <Col>
          <RatingView ratingValue={movie.rating} />
        </Col>
        <hr />
      </Row>
    );
  });

  const onChangeFilter = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  };

  const onSubmitFilter = () => {
    switch (filter) {
      case "all":
        setBooks(ratedAllBooks);
        setMovies(ratedAllMovies);
        break;
      default:
        setBooks(ratedAllBooks.filter((book) => book.rating + "" === filter));
        setMovies(ratedAllMovies.filter((movie) => movie.rating + "" === filter));
    }
  };

  return (
    <div className="ratings-page">
      <Container>
        <Row>
          <Col>
            <h1 className="ratings-title">Your Ratings</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div  className="filter-div">
              <Form>
                <FormGroup onChange={onChangeFilter} tag="fieldset">
                  <legend>Filter</legend>
                  <FormGroup check inline>
                    <Label check>
                      <Input defaultChecked value="all" type="radio" name="filter" id="radio0" />{' '}
                      All Ratings
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="radio" value="1" name="filter" id="radio1" />{' '}
                      1 Star
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="radio" value="2" name="filter" id="radio2" />{' '}
                      2 Stars
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="radio" value="3" name="filter" id="radio3" />{' '}
                      3 Stars
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="radio" value="4" name="filter" id="radio4" />{' '}
                      4 Stars
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="radio" value="5" name="filter" id="radio5" />{' '}
                      5 Stars
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Form>
              <Button onClick={onSubmitFilter} className="filter-button">Filter</Button>
            </div>
          </Col>
        </Row>
        <div className="media-ratings-div">
          <h1 className="ratings-div-title">Book Ratings</h1>
          {bookRatings}
        </div>
        <div className="media-ratings-div">
          <h1 className="ratings-div-title">Movie Ratings</h1>
          {movieRatings}
        </div>
      </Container>
    </div>
  );
}
