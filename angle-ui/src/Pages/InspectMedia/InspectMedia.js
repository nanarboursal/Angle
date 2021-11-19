import React, { useState, useEffect } from "react";
import { getBooks, getMovies } from "../../Functions/UserFunctions";
import { Container, Row, Col } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";
import { useParams } from 'react-router-dom'

import "./inspect-media.css";

export const InspectMedia = (props) => {

  const { mediaType, mediaID, notes, rating } = useParams();
  const splitMediaID = mediaID.split("&&&&");
  const title = splitMediaID[0];
  const author = splitMediaID[1];

  return (
    <Container>
      <Row>
        <Col>
          <h1>{title}</h1>
          <h1>{author}</h1>
          <h1>{rating}</h1>
          <h1>{notes}</h1>
        </Col>
      </Row>
    </Container>
  );
}
