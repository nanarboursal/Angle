import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import "./playlists.css";

export default function Playlists() {

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
        </Container>
    );
}