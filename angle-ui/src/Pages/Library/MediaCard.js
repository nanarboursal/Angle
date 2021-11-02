import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./media-card.css";

export const MediaCard = props => {
    return (
      <div className="card-wrapper">
        <Card>
          <CardBody>
            <CardTitle className="med-title">
              {props.book.title}
            </CardTitle>
            <CardTitle className="med-author">
              {props.book.author}
            </CardTitle>
            <CardTitle className="med-rating">
              {props.book.rating}
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default MediaCard;