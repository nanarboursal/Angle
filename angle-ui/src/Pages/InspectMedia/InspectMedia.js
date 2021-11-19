import React, { useState, useEffect } from "react";
import { getBooks, getMovies } from "../../Functions/UserFunctions";
import { Container, Row, Col } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";
import { useParams } from 'react-router-dom'

import "./inspect-media.css";

export const InspectMedia = (props) => {

  const { mediaType, mediaID } = useParams();

  const theMedia = {
    "mediaType": mediaType,
    "mediaID": mediaID,
    "title": "",
    "author": "",
    "rating": 0,
    "notes": ""
  };

  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [media, setMedia] = useState(theMedia);

  function filterByID(media) {
    if (media.mediaID == mediaID) {
      return true;
    }
    return false;
  }

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

    if (mediaType == "book") {
      const filteredBooks = books.filter(filterByID);
      console.log("the filtered books are here ", filteredBooks);
      setMedia(filteredBooks[0]);
    } else {
      const filteredMovies = movies.filter(filterByID);
      setMedia(filteredMovies[0]);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{media.title}</h1>
          <h1>{media.author}</h1>
          <h1>{media.rating}</h1>
          <h1>{media.notes}</h1>
        </Col>
      </Row>
    </Container>
  );
}
