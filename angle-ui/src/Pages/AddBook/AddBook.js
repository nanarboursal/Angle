import React from "react";
import { Button, Container, Row, Col } from "reactstrap";

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
        </Container>
    </div>
  );
}
