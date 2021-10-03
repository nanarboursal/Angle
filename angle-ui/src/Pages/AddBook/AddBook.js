import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { data } from "./books.json";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./add-book.css";

export default function AddBook() {
  return (
    <div>
      <Container >
        <Row className="add-title">
          <Col>
            <h1>Add Your Book!</h1>
          </Col>
        </Row>
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
            <Button>Add Notes to Book</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
