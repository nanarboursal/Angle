import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { deleteMedia } from "../../../Functions/UserFunctions";
import "./media-card.css";

export const MediaCard = props => {

  const onDelete = (media) => {  
    const toBeDeleted = {
      title: media.title,
      author: media.author,
      mediaType: media.mediaType
    };

    deleteMedia(toBeDeleted).then(res => {
      if (!res.error && !res.result) {
        alert("The media " + media.title + " has been removed from your library.");
        window.location.reload();
      } else {
        alert("An error has occured!");
      }
    });
  };

  return (
    <div className="card-wrapper">
      <Card>
        <CardBody>
          <CardTitle className="med-title">
            Type: {props.media.mediaType}
          </CardTitle>
          <CardTitle className="med-title">{props.media.title}</CardTitle>
          <CardTitle className="med-author">{props.media.author}</CardTitle>
          <CardTitle className="med-rating">{props.media.rating}</CardTitle>
          <a onClick={() => onDelete(props.media)}>X</a>
        </CardBody>
      </Card>
    </div>
  );
};

export default MediaCard;
