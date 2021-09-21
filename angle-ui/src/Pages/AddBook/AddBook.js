import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { data } from "./books.json";
import SearchBar from "../../Components/SearchBar/SearchBar";
import BookList from "./BookList";
import "./add-book.css";

export default function AddBook() {
  const [input, setInput] = useState("");
  const [bookListDefault, setBookListDefault] = useState(data);
  const [bookList, setBookList] = useState(data);

  const updateInput = async (input) => {
    const filtered = bookListDefault.filter(book => {
      return book.title.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setBookList(filtered);
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
            <SearchBar input={input} onChange={updateInput} />
          </Col>
        </Row>
        <Row>
          <Col>
          <BookList bookList={bookList}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
