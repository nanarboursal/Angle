import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, ButtonGroup } from "reactstrap";
import { data } from "../../Data/Books/books.json";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./add-media.css";

export default function AddMedia() {
  const [mediaType, setMediaType] = useState("");
  return (
    <div>
      <Container>
        <Row className="add-title">
          <Col>
            <h1>Add Your Media!</h1>
          </Col>
        </Row>
        <Row className="media-type">
          <Col>
            <ButtonGroup>
              <Button onClick={() => setMediaType("Book")}>Book</Button>
              <Button onClick={() => setMediaType("Movie")}>Movie</Button>
            </ButtonGroup>
          </Col>
          <Col>
            <p>Media Type: {mediaType}</p>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className="manual-add">
            <input placeholder="Enter title."></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchBar placeholder="Enter a media title!" data={data} />
          </Col>
          <Col className="manual-add">
            <input placeholder="Enter author or director."></input>
          </Col>
        </Row>
        <Row>
          <Col> </Col>
          <Col className="notes">
            <textarea placeholder="Enter notes here."></textarea>
          </Col>
        </Row>
        <Row className="submit-btn">
          <Col>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
