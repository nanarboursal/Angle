import React, { useState } from "react";
import "./login.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <Container>
        <Row className="page-title">
          <Col>
            <h1>Log In</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup className="login-group">
                <Label for="userEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="Enter Email"
                />
              </FormGroup>
              <FormGroup className="login-group">
                <Label for="userPassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="userPassword"
                  placeholder="Enter Password"
                />
              </FormGroup>
              <Button className="signup-group">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
