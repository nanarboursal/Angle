import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, ButtonGroup } from "reactstrap";
// import { data } from "../../Data/Books/books.json";
import { data } from "./books.json";
// import SearchBar from "../../Components/SearchBar/SearchBar";
import { addMedia } from "../../Functions/UserFunctions";
import { Rating, RatingView } from "react-simple-star-rating";
import Autocomplete from "../../Components/Autocomplete/autocomplete";
import jwt_decode from "jwt-decode";
import "./add-media.css";

class AddMedia extends React.Component {
  constructor() {
    super();
    this.state = {
      mediaType: "",
      title: "",
      author: "",
      notes: "",
      rating: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const media = {
      mediaType: this.state.mediaType,
      title: this.state.title,
      author: this.state.author,
      notes: this.state.notes,
      rating: this.state.rating
    };

    addMedia(media).then(res => {
      console.log(media);
      if (!res.error && !res.result) {
        alert(this.state.title + " was added to your library!");
        this.props.history.push("/");
      } else {
        alert("User not found!");
      }
    });
  };

  changeType(theType) {
    this.setState({ mediaType: theType });
  }

  handleRating = (rate) => {
    this.setState({rating: rate});
    console.log("the rating is now", this.state.rating);
  }

  render() {
    return (
      <div>
        <Container>
          {console.log("this is the user type", this.state.mediaType)}
          <Row className="add-title">
            <Col>
              <h1>Add Your Media!</h1>
            </Col>
          </Row>
          <Row className="media-type">
            <Col>
              <ButtonGroup>
                <Button onClick={() => this.changeType("Book")}>Book</Button>
                <Button onClick={() => this.changeType("Movie")}>Movie</Button>
              </ButtonGroup>
            </Col>
            <Col>
              <p>Media Type: {this.state.mediaType}</p>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="manual-add">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter title."
                value={this.state.title}
                onChange={this.onChange}
              ></input>
            </Col>
          </Row>
          <Row>
            <Col>
              <Autocomplete placeholder="Enter a media title!" data={data} />
            </Col>
            <Col className="manual-add">
              <input
                type="text"
                name="author"
                id="author"
                onChange={this.onChange}
                value={this.state.author}
                placeholder="Enter author or director."
              ></input>
            </Col>
          </Row>
          <Row>
            <Col> </Col>
            <Col>
              <p>Choose a rating.</p>
              <Rating ratingValue={this.state.rating} onClick={(theRating) => this.handleRating(theRating)} />
            </Col>
          </Row>
          <Row>
            <Col> </Col>
            <Col className="notes">
              <textarea
                type="text"
                name="notes"
                id="notes"
                onChange={this.onChange}
                value={this.state.notes}
                placeholder="Enter notes here."
              ></textarea>
            </Col>
          </Row>
          <Row className="submit-btn">
            <Col>
              <Button onClick={this.onSubmit}>Submit</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddMedia;
