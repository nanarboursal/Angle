import React from "react";
import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import { deleteMedia } from "../../../Functions/UserFunctions";
import { BsFillTrashFill, BsFillArrowUpRightCircleFill} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./media-card.css";
import bookIcon from "../../../Images/BookIcon.png"
import movieIcon from "../../../Images/MovieIcon.png"
import { AiOutlineStar } from "react-icons/ai";

export const MediaCard = props => {

  const history = useHistory();

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

  const inspectMedia = (media) => {
    const mediaID = media.title + "&&&&" + media.author;
    const mediaType = media.mediaType;
    const notes = media.notes;
    const rating = media.rating;
    history.push("/inspectmedia/" + mediaType + "/" + mediaID + "/" + notes + "/" + rating);
  };

  return (
    <div className="card-wrapper" >
      <Card className="card-wrapper-home">
        <CardBody>
          <CardImg className='pic-dim' src={props.media.mediaType == "book" ? bookIcon : movieIcon} alt="lib-card" />
          <CardTitle className="med-title">{props.media.title}</CardTitle>
          <CardTitle className="med-author">{props.media.author}</CardTitle>
          <CardTitle className="med-rating"><AiOutlineStar/> {props.media.rating}</CardTitle>
          <a style={{cursor: "pointer"}} onClick={() => onDelete(props.media)}><BsFillTrashFill/></a>
          <a style={{cursor: "pointer", marginLeft: 40}} onClick={() => inspectMedia(props.media)}><BsFillArrowUpRightCircleFill/></a>
        </CardBody>
      </Card>
    </div>
  );
};

export default MediaCard;
