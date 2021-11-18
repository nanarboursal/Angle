import React from "react";
import { login } from "../../Functions/UserFunctions";
import logo from "../../Images/angle-transparent.png";
import book from "../../Images/BookIcon.png";
import movie from "../../Images/MovieIcon.png";
import "./login.css";
import { AuthButton, Center, Logo } from "./Login.styles";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (!res.error && !res.result) {
        this.props.history.push("/");
      } else {
        alert("Invalid Information!");
      }
    });
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.email.includes("@");
  }

  render() {
    return (
      <Container className="login-page">
        <Row>
          <Col>
            <div class="form-container sign-in-container">
              <Row className="page-title">
                <Center>
                  <Logo src={logo} />
                </Center>
              </Row>
              <Form>
                <FormGroup className="login-group">
                  <Col>
                    <h1>Sign In</h1>
                  </Col>
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
                <FormGroup className="login-group">
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
                <AuthButton disabled={!this.validateForm()} onClick={this.onSubmit}>Submit</AuthButton>
              </Form>
            </div>
          </Col>
          <Col>
              <div class="overlay">
                <div class="overlay-panel overlay-right">
                  <Logo src={movie} />
                  <Logo src={book} />
                </div>
              </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
