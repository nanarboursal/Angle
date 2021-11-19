import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { deletePlaylist } from "../../../Functions/UserFunctions";
import { BsFillTrashFill, BsFillArrowUpRightCircleFill} from "react-icons/bs";
import "./playlist-card.css";

export const PlaylistCard = props => {

    const onDelete = (playlist) => {
        const toBeDeleted = {
            playlistName: playlist.playlistName
        };

        deletePlaylist(toBeDeleted).then(res => {
            if (!res.error && !res.result) {
                alert("The playlist " + playlist.playlistName + " has been removed from your playlists.");
                window.location.reload();
            } else {
                alert("An error has occured!");
            }
        });
    };

    const inspectPlaylist = (playlist) => {
        console.log(playlist.playlistName, " was clicked.");
    };

    return (
        <div className="card-wrapper">
            <Card>
                <CardBody>
                    <CardTitle className="med-title">{props.playlist.playlistName}
                    </CardTitle>
                    <a style={{cursor: "pointer"}} onClick={() => onDelete(props.playlist)}><BsFillTrashFill/></a>
                    <a style={{cursor: "pointer", marginLeft: 40}} onClick={() => inspectPlaylist(props.playlist)}><BsFillArrowUpRightCircleFill/></a>
                </CardBody>
            </Card>
        </div>
    );
};

export default PlaylistCard;
