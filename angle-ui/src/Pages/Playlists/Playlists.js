import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { getPlaylists } from '../../Functions/UserFunctions';
import PlaylistCard from './PlaylistCard/PlaylistCard';
import "./playlists.css";

export default function Playlists() {
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

    let playlistCards = playlists.map(playlist => {
        return (
            <li className="flex-item">
                <PlaylistCard playlist={playlist} />
            </li>
        );
    });

    return (
        <Container className="playlists-title">
            <Row >
                <Col>
                    <h1>Your Playlists</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="add-buttons" href="/addplaylist">
                        Add Playlist
                    </Button>
                </Col>
            </Row>
            <Row>
                <ul className="flex-container wrap-reversez">{playlistCards}</ul>
            </Row>
        </Container>
    );
}