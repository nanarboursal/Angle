import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import "./add-playlist.css";
import { addPlaylist } from '../../Functions/UserFunctions';

class AddPlaylist extends React.Component {
    constructor() {
        super();
        this.state = {
            playlistName: "",
            books: [],
            movies: []
        };
        this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const playlist = {
            playlistName: this.state.playlistName,
            books: this.state.books,
            movies: this.state.movies
        };

        addPlaylist(playlist).then(res => {
            if (!res.error && !res.result) {
                alert(this.state.playlistName + " was added to your playlists!");
                this.props.history.push("/playlists");
            } else {
                alert("User not found!");
            }
        });
    };

    render() {
        return (
            <Container>
                <Row className="add-playlist-title">
                    <Col>
                        <h1>Create New Playlist</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="playlist-name">
                        <input
                            type="text"
                            name="playlistName"
                            id="playlistName"
                            placeholder="Enter playlist name."
                            value={this.state.playlistName}
                            onChange={this.onChange}
                        ></input>
                    </Col>
                </Row>
                <Row className="submit-btn">
                    <Col>
                        <Button onClick={this.onSubmit}>Create</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AddPlaylist;