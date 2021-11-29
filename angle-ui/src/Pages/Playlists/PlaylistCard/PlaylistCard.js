import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { deletePlaylist } from "../../../Functions/UserFunctions";
import { BsFillTrashFill, BsFillArrowUpRightCircleFill} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./playlist-card.css";

export const PlaylistCard = props => {

    const history = useHistory();

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
        const playlistName = playlist.playlistName; 
        history.push("/inspectplaylist/" + playlistName);
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
