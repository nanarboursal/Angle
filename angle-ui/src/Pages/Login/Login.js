import React from "react";
import { login, resetPassword } from "../../Functions/UserFunctions";
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
  Input,
  Button,
  Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      resetPassModalEnabled: false,
      resetPasswordEmail: "",
      resetPasswordPassword: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onToggleModal = () => {
    this.setState(prevState => ({
      resetPassModalEnabled: !prevState.resetPassModalEnabled
    }));
  };

  onResetPassword(e) {
    const user = {
      email: "nanarb@gmail.com",
      newPassword: "123456789"
    };

    resetPassword(user).then(res => {
      if (!res.error && !res.result) {
        alert("Password Reset!");
        window.location.reload();
      } else {
        alert("Invalid Information!");
      }
    });
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
        alert("Login Successful!");
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
      <div className="login-page">
        <Row>
          <Col>
            <Row>
              <Center>
                <Logo src={logo} />
              </Center>
            </Row>
            <Row>
              <Form className="login-form">
                <FormGroup className="login-group">
                  <Col>
                    <h1>Sign In</h1>
                  </Col>
                  <Label for="userEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="userEmail"
                    className="login-input"
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
                    className="login-input"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button onClick={() => this.onToggleModal()} className="forgot-pass-button">Forgot Password?</Button>
                <AuthButton disabled={!this.validateForm()} onClick={this.onSubmit}>Submit</AuthButton>
              </Form>
            </Row>
          </Col>
          <Col>
            <div className="overlay">
              <div className="overlay-panel overlay-right">
              </div>
            </div>
          </Col>
          <Modal isOpen={this.state.resetPassModalEnabled} toggle={() => this.onToggleModal()}>
            <ModalHeader>Reset Password</ModalHeader>
            <ModalBody>
              <Input
                type="email"
                name="resetPasswordEmail"
                id="userResetEmail"
                className="modal-inputs"
                placeholder="Enter email."
                value={this.state.resetPasswordEmail}
                onChange={this.onChange}>
              </Input>
            </ModalBody>
            <ModalBody>
              <Input
                type="password"
                name="resetPasswordPassword"
                id="userResetPassword"
                className="modal-inputs"
                placeholder="Enter new password."
                value={this.state.resetPasswordPassword}
                onChange={this.onChange}>
              </Input>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onResetPassword}>Reset</Button>
            </ModalFooter>
          </Modal>
        </Row>
      </div>
    );
  }
}

export default Login;
