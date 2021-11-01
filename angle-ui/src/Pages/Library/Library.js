import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./library.css";
import { isLoggedIn } from "../../Functions/Authentication";

export default function Library() {
  return (
    <div className="lib-title">
      {isLoggedIn() ? (
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
      )}
    </div>
  );
}
