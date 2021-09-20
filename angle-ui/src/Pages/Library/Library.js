import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./library.css";

export default function Library() {
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
            <Button className="add-buttons" href="/addbook">Add Book</Button>
            <Button className="add-buttons" href="/addmovie">Add Movie</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
