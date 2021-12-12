import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, ButtonGroup } from "reactstrap";
import { data } from "../../Data/Books/books.json";
// import { data } from "./books.json";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { addMedia } from "../../Functions/UserFunctions";
import { Rating, RatingView } from "react-simple-star-rating";
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
    this.setState({ rating: rate });
    console.log("the rating is now", this.state.rating);
  }

  clickEvent = (media) => {
    this.setState({ title: media.title });
    this.setState({ author: media.authors });
  }

  render() {
    return (
      <div className="add-media-page">
        <Container>
          <Row>
            <Col>
              <h1 className="add-title">Add New Media</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <SearchBar placeholder="Enter a media title!" data={data} clickEvent={this.clickEvent} />
            </Col>
          </Row>
          <Row className="media-type">
            <Col>
              <ButtonGroup>
                <Button className="type-chooser-book" onClick={() => this.changeType("Book")}>Book</Button>
                <Button className="type-chooser-movie" onClick={() => this.changeType("Movie")}>Movie</Button>
              </ButtonGroup>
            </Col>
            <Col>
              <p className="type-titles">Media Type</p>
              <p className="type-test">:  {this.state.mediaType}</p>
            </Col>
          </Row>
          <Row>
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
            <Col>
              <p className="type-titles">Choose a rating.</p>
              <Rating ratingValue={this.state.rating} fillColor="#8a584c" emptyColor="white" onClick={(theRating) => this.handleRating(theRating)} />
            </Col>
          </Row>
          <Row>
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
          <Row>
            <Col>
              <div className="button-col">
                <Button className="submit-btn" onClick={this.onSubmit}>Submit</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddMedia;