import React, { useState } from "react";
import { login, register } from "../../Functions/UserFunctions";
import "./signup.css";
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

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(res => {
      if (!res.result.error) {
        console.log("registration success");
        this.props.history.push("/login");
      } else {
        alert("An account with that email already exists!");
      }
    });

    // const user = {
    //   email: this.state.email,
    //   password: this.state.password
    // };

    // login(user).then(res => {
    //   if (!res.error && !res.result) {
    //     this.props.history.push("/");
    //   } else {
    //     alert("Invalid Information!");
    //   }
    // });
  }

  validateForm() {
    return (
      this.state.password == this.state.confirmPassword &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.email.includes("@")
    );
  }

  render() {
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
                  <Label for="first_name">First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Enter First Name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup className="signup-group">
                  <Label for="last_name">Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Enter Last Name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup className="signup-group">
                  <Label for="userEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="userEmail"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup className="signup-group">
                  <Label for="userPassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="userPassword"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup className="signup-group">
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Re-enter Password"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button className="signup-group"  onClick={this.onSubmit} disabled={!this.validateForm()}>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignUp;