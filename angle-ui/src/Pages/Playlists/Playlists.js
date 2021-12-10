import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { getPlaylists } from '../../Functions/UserFunctions';
import PlaylistCard from './PlaylistCard/PlaylistCard';
import { BsFillTrashFill, BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { GoFileMedia } from "react-icons/go";
import { deletePlaylist } from '../../Functions/UserFunctions';
import { useHistory } from "react-router-dom";
import "./playlists.css";

export default function Playlists() {
    const history = useHistory();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getPlaylists().then(res => {
            if (!res.error && !res.result) {
                setPlaylists(res);
            } else {
                alert("error");
            }
        });
    }, []);

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

    // let playlistCards = playlists.map(playlist => {
    //     return (
    //         <li className="flex-item">
    //             <PlaylistCard playlist={playlist} />
    //         </li>
    //     );
    // });

    let playlistsList = playlists.map(playlist => {
        return (
            <Row>
                <Col>
                    <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>{playlist.playlistName}</p>
                </Col>
                <Col>
                    <p>{playlist.books.length + playlist.movies.length} <GoFileMedia/></p>
                </Col>
                <Col><a style={{ cursor: "pointer" }} onClick={() => inspectPlaylist(playlist)}><BsFillArrowUpRightCircleFill /></a></Col>
                <Col><a style={{ cursor: "pointer" }} onClick={() => onDelete(playlist)}><BsFillTrashFill /></a></Col>
                <hr />
            </Row>
        );
    });

    return (
        <div className="playlists-page">
            <Container>
                <Row >
                    <Col>
                        <h1 className="playlists-title">Your Playlists</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="playlist-add-buttons" href="/addplaylist">
                            Add Playlist
                        </Button>
                    </Col>
                </Row>
                {/* <Row>
                <ul className="flex-container wrap-reversez">{playlistCards}</ul>
            </Row> */}
                <div className="playlists-list-div">
                    {playlistsList}
                </div>
            </Container>
        </div>
    );
}