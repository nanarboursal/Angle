import React, { useState, useEffect } from "react";
import { getBooks, getMovies, updateMedia } from "../../Functions/UserFunctions";
import { Container, Row, Col, Button } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";
import { useParams, useHistory } from 'react-router-dom'

import "./inspect-media.css";

export const InspectMedia = (props) => {

  const history = useHistory();

  const { mediaType, mediaID, notes, rating } = useParams();
  const splitMediaID = mediaID.split("&&&&");
  const title = splitMediaID[0];
  const author = splitMediaID[1];

  const [theTitle, setTitle] = useState(title);
  const [theAuthor, setAuthor] = useState(author);
  const [theNotes, setNotes] = useState(notes);
  const [theRating, setRating] = useState(rating);


  const changeTitle = title => {
    setTitle(title.target.value);
  }

  const changeAuthor = author => {
    setAuthor(author.target.value);
  }

  const changeNotes = notes => {
    setNotes(notes.target.value);
  }

  const changeRating = (rate) => {
    setRating(rate);
  }

  const onSubmit = e => {
    // e.preventDefault();

    const updatedMedia = {
      mediaType: mediaType,
      oldTitle: title,
      oldAuthor: author,
      title: theTitle,
      author: theAuthor,
      notes: theNotes,
      rating: theRating
    };

    updateMedia(updatedMedia).then(res => {
      if (!res.error && !res.result) {
        alert(theTitle + " was updated in your library!");
        history.push("/");
      } else {
        alert("User not found!");
      }
    });

    console.log("changes submitted");
  };



  return (
    <div>
      <Container>
        <Row className="add-title">
          <Col>
            <h1>Inspect Media</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* picture goes here */}
          </Col>
          <Col>
            <Row className="media-type">
              <Col>
                <p>Media Type: {mediaType}</p>
              </Col>
            </Row>
            <Row>
              <Col className="manual-add">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title."
                  value={theTitle}
                  onChange={changeTitle}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col className="manual-add">
                <input
                  type="text"
                  name="author"
                  id="author"
                  onChange={changeAuthor}
                  value={theAuthor}
                  placeholder="Enter author or director."
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Rating</p>
                <Rating ratingValue={theRating} onClick={(theRating) => changeRating(theRating)} />
              </Col>
            </Row>
            <Row>
              <Col className="notes">
                <textarea
                  type="text"
                  name="notes"
                  id="notes"
                  onChange={changeNotes}
                  value={theNotes}
                  placeholder="Enter notes here."
                ></textarea>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="submit-btn">
          <Col>
            <Button onClick={onSubmit}>Save</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
