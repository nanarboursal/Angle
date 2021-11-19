import React, { useState, useEffect } from "react";
import { getBooks, getMovies } from "../../Functions/UserFunctions";
import { Container, Row, Col } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";

import "./inspect-playlist.css";

export const InspectPlaylist = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>INSPECT PLAYLIST PAGE (will be personalized)</h1>
        </Col>
      </Row>
    </Container>
  );
}
