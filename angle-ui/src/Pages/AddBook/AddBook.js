import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { data } from "./books.json";
import BookList from "./BookList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./add-book.css";

export default function AddBook() {
  
  return (
    <div>
      <Container>
        <Row className="add-title">
          <Col>
            <h1>Add Your Book!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchBar placeholder="Enter a book title!" data={data}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
