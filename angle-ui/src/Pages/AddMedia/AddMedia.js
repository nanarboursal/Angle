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
        {/* <Row className="add-title">
          <Col>
            <ButtonGroup>
              <Button onClick={setMediaType("book")}>
                Book
              </Button>
              <Button onClick={setMediaType("movie")}>
                Movie
              </Button>
            </ButtonGroup>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <SearchBar placeholder="Enter a book title!" data={data} />
          </Col>
        </Row>
        <Row className="manual-add">
          <Col>
            <input placeholder="Enter title manually."></input>
          </Col>
          <Col>
            <input placeholder="Enter author manually."></input>
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
