import React, { useState, useEffect } from "react";
import { getBooks, getMovies, updateMedia } from "../../Functions/UserFunctions";
import { Container, Row, Col, Button } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";
import { useParams, useHistory } from 'react-router-dom';
import movieImage from "../../Images/MovieIcon.png";
import bookImage from "../../Images/BookIcon.png";

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
    <div className="inspect-media-page">
      <Container>
        <Row>
          <Col>
            <h1 className="inspect-media-title">Inspect Media</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <img src={mediaType == "book" ? bookImage : movieImage} alt="spec-media" />
          </Col>
          <Col>
            <Row>
              <Col>
                <p className="inspect-type-titles">Media Type</p>
                <p className="inspect-type-test">: {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</p>
              </Col>
            </Row>
            <Row>
              <Col className="inspect-manual">
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
              <Col className="inspect-manual">
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
                <p className="inspect-type-titles">Rating</p>
                <Rating fillColor="#8a584c" emptyColor="white" ratingValue={theRating} onClick={(theRating) => changeRating(theRating)} />
              </Col>
            </Row>
            <Row>
              <Col className="inspect-notes">
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

        <Row>
          <Col>
            <div className="save-media-btn-col">
              <Button className="save-media-btn" onClick={onSubmit}>Save</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
