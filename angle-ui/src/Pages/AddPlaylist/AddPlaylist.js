import React from 'react';
import { Container, Row, Col, Button, Table } from "reactstrap";
import "./add-playlist.css";
import { addPlaylist, getBooks, getMovies } from '../../Functions/UserFunctions';

class AddPlaylist extends React.Component {
    constructor() {
        super();
        this.state = {
            playlistName: "",
            books: [],
            movies: [],
            libraryBooks: [],
            libraryMovies: []
        };
        this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        getBooks().then(res => {
            if (!res.error && !res.result) {
                this.setState({ libraryBooks: res });
            } else {
                alert("error");
            }
        });
        getMovies().then(res => {
            if (!res.error && !res.result) {
                this.setState({ libraryMovies: res });
            } else {
                alert("error");
            }
        });
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

    renderBookTableData() {
        return this.state.libraryBooks.map((book, index) => {
            return (
                <tr key={book.title}>
                    <td style={{fontStyle: "italic", fontWeight: "bold"}}>{book.title}</td>
                    <td>{book.author}</td>
                    <td><Button style={{width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => this.onAddBookToPlaylist(book)}> + </Button></td>
                </tr>
            )
        })
    }

    renderMovieTableData() {
        return this.state.libraryMovies.map((movie, index) => {
            return (
                <tr key={movie.title}>
                    <td style={{fontStyle: "italic", fontWeight: "bold"}}>{movie.title}</td>
                    <td>{movie.author}</td>
                    <td><Button style={{width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => this.onAddMovieToPlaylist(movie)}> + </Button></td>
                </tr>
            )
        })
    }

    renderPlaylistBookTableData() {
        return this.state.books.map((book, index) => {
            return (
                <tr key={book.title}>
                    <td style={{fontStyle: "italic", fontWeight: "bold"}}>{book.title}</td>
                    <td>{book.author}</td>
                    <td><Button style={{width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => this.onRemoveBookFromPlaylist(book)}> - </Button></td>
                    <td>See Media</td>
                </tr>
            )
        })
    }

    renderPlaylistMovieTableData() {
        return this.state.movies.map((movie, index) => {
            return (
                <tr key={movie.title}>
                    <td style={{fontStyle: "italic", fontWeight: "bold"}}>{movie.title}</td>
                    <td>{movie.author}</td>
                    <td><Button style={{width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => this.onRemoveMovieFromPlaylist(movie)}> - </Button></td>
                </tr>
            )
        })
    }

    onAddBookToPlaylist(book) {
        this.setState({
            books: [
                ...this.state.books,
                book
            ]
        })
        this.removeBookFromLibraryOptions(book);
    }

    onAddMovieToPlaylist(movie) {
        this.setState({
            movies: [
                ...this.state.movies,
                movie
            ]
        })
        this.removeMovieFromLibraryOptions(movie);
    }

    removeBookFromLibraryOptions(removedBook) {
        this.setState({
            libraryBooks: this.state.libraryBooks.filter(function (book) {
                return book !== removedBook
            })
        });
    }

    removeMovieFromLibraryOptions(removedMovie) {
        this.setState({
            libraryMovies: this.state.libraryMovies.filter(function (movie) {
                return movie !== removedMovie
            })
        });
    }

    addBookBackToLib(book) {
        this.setState({
            libraryBooks: [
                ...this.state.libraryBooks,
                book
            ]
        })
    }

    addMovieBackToLib(movie) {
        this.setState({
            libraryMovies: [
                ...this.state.libraryMovies,
                movie
            ]
        })
    }

    onRemoveBookFromPlaylist(removedBook) {
        this.setState({
            books: this.state.books.filter(function (book) {
                return book !== removedBook
            })
        });
        this.addBookBackToLib(removedBook);
    }

    onRemoveMovieFromPlaylist(removedMovie) {
        this.setState({
            movies: this.state.movies.filter(function (movie) {
                return movie !== removedMovie
            })
        });
        this.addMovieBackToLib(removedMovie);
    }



    render() {
        return (
            <div className="add-playlist-page">
                <Container>
                    <Row >
                        <Col>
                            <h1 className="add-playlist-title">Create New Playlist</h1>
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
                    <Row>
                        <Col>
                            <h1 className="table-top-header-title">In Your Playlist</h1>
                        </Col>
                    </Row>
                    <div className="table-list-div">
                        <Row>
                            <Col>
                                <h2 className="table-top-title">Books</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Keep in Playlist?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPlaylistBookTableData()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="table-top-title">Movies</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Keep in Playlist?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPlaylistMovieTableData()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <h1 className="table-top-header-title">Library Options</h1>
                        </Col>
                    </Row>
                    <div className="table-list-div">

                        <Row>
                            <Col>
                                <h2 className="table-top-title">Books</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Add to Playlist?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderBookTableData()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="table-top-title">Movies</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Add to Playlist?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderMovieTableData()}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <div className="create-button-col ">
                                <Button className="create-btn" onClick={this.onSubmit}>Create</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AddPlaylist;