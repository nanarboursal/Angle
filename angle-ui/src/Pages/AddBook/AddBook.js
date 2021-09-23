import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { data } from "./books.json";
import BookList from "./BookList";
import "./add-book.css";

export default function AddBook() {
  const [input, setInput] = useState("");

  const editSearchTerm = e => {
    setInput(e.target.value);
  };

  const dynamicSearch = () => {
    return data.filter(book =>
      book.title.toLowerCase().includes(input.toLowerCase())
    );
  };

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
            <input
              type="text"
              value={input}
              onChange={editSearchTerm}
              placeholder="Search for a title!"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <BookList bookList={dynamicSearch()} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
