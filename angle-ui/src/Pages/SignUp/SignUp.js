import React from "react";
import "./signup.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default function SignUp() {
  return (
    <div className="signup-page">
      <Container>
        <Row className="page-title">
          <Col>
            <h1>Sign Up</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup className="signup-group">
                <Label for="userEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="Enter Email"
                />
              </FormGroup>
              <FormGroup className="signup-group">
                <Label for="userPassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="userPassword"
                  placeholder="Enter Password"
                />
              </FormGroup>
              <FormGroup className="signup-group">
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-enter Password"
                />
              </FormGroup>
              <FormGroup className="signup-group">
                <Label for="favBookGenres">
                  Select your favorite book genres! (hold cmd to select
                  multiple)
                </Label>
                <Input
                  type="select"
                  name="selectBookGenres"
                  id="favBookGenres"
                  multiple
                >
                  <option>Mystery</option>
                  <option>Romance</option>
                  <option>Fiction</option>
                  <option>Thriller</option>
                  <option>Historical</option>
                  <option>Sci-Fi</option>
                  <option>Fantasy</option>
                  <option>Dystopian</option>
                  <option>Western</option>
                  <option>Non-Fiction</option>
                </Input>
              </FormGroup>
              <FormGroup className="signup-group">
                <Label for="favMovieGenres">
                  Select your favorite movie genres! (hold cmd to select
                  multiple)
                </Label>
                <Input
                  type="select"
                  name="selectMovieGenres"
                  id="favMovieGenres"
                  multiple
                >
                  <option>Mystery</option>
                  <option>Romance</option>
                  <option>Fiction</option>
                  <option>Thriller</option>
                  <option>Historical</option>
                  <option>Sci-Fi</option>
                  <option>Fantasy</option>
                  <option>Dystopian</option>
                  <option>Western</option>
                  <option>Non-Fiction</option>
                </Input>
              </FormGroup>
              <FormGroup check className="signup-group">
                <Label check>
                  <Input type="checkbox" /> I agree to Angle's Terms and Conditions.
                </Label>
              </FormGroup>
              <Button className="signup-group">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
