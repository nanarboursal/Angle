import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { deletePlaylist } from "../../../Functions/UserFunctions";
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

    return (
        <div className="card-wrapper">
            <Card>
                <CardBody>
                    <CardTitle className="med-title">{props.playlist.playlistName}
                    </CardTitle>
                    <a onClick={() => onDelete(props.playlist)}>X</a>
                </CardBody>
            </Card>
        </div>
    );
};

export default PlaylistCard;
