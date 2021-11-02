import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./library.css";
import { isLoggedIn } from "../../Functions/Authentication";
import MediaCard from "./MediaCard";
import { getlibrary } from "../../Functions/UserFunctions";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getlibrary().then(res => {
      if (!res.error && !res.result) {
        setBooks(res);
        alert("library retrieved!");
      } else {
        alert("error");
      }
    });
  }, []);
  console.log("here are the books", books);

  let mediaCards = books.map(book => {
    return (
      <li className="flex-item">
        <MediaCard book={book} />
      </li>
    );
  });

  return (
    <div className="lib-title">
      <Container>
        <Row>
          <Col>
            <h1>Your Library</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="add-buttons" href="/addmedia">
              Add Media
            </Button>
          </Col>
        </Row>
        <Row>
          <ul className="flex-container wrap-reversez">{mediaCards}</ul>
        </Row>
      </Container>
      {/* {isLoggedIn() ? (
          <Container>
            <Row>
              <Col>
                <h1>Your Library</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="add-buttons" href="/addmedia">
                  Add Media
                </Button>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col>
                <h1>Please Log In!</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="add-buttons" href="/login">
                  Login
                </Button>
              </Col>
            </Row>
          </Container>
        )} */}
    </div>
  );
}
