import React, { useState, useEffect } from "react";
import { getBooks, getMovies, getPlaylistBooks, getPlaylistMovies, updatePlaylist } from "../../Functions/UserFunctions";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { Rating, RatingView } from "react-simple-star-rating";
import { useParams, useHistory } from 'react-router-dom'

import "./inspect-playlist.css";

export const InspectPlaylist = (props) => {
  const history = useHistory();

  const { playlistName } = useParams();

  const [thePlaylistName, setPlaylistName] = useState(playlistName);
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [libraryMovies, setLibraryMovies] = useState([]);

  useEffect(() => {
    getPlaylistBooks(playlistName).then(res => {
      if (!res.error && !res.result) {
        setBooks(res)
        console.log(books);
      } else {
        alert("error");
      }
    });

    getPlaylistMovies(playlistName).then(res => {
      if (!res.error && !res.result) {
        setMovies(res)
        console.log(movies);
      } else {
        alert("error");
      }
    });
    getBooks().then(res => {
      if (!res.error && !res.result) {
        setLibraryBooks(res);
      } else {
        alert("error");
      }
    });
    getMovies().then(res => {
      if (!res.error && !res.result) {
        setLibraryMovies(res);
      } else {
        alert("error");
      }
    });
  }, []);

  const changePlaylistName = playlistName => {
    setPlaylistName(playlistName.target.value);
  }

  const onSubmit = e => {
    // e.preventDefault();

    const updatedPlaylist = {
      oldPlaylistName: playlistName,
      playlistName: thePlaylistName,
      books: books,
      movies: movies
    };

    updatePlaylist(updatedPlaylist).then(res => {
      if (!res.error && !res.result) {
        alert(thePlaylistName + " was updated in your playlists!");
        history.push("/playlists");
      } else {
        alert("User not found!");
      }
    });

    console.log("submitted playlist changes");
  };

  const renderBookTableData = () => {
    return libraryBooks.map((book, index) => {
      return (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td><Button onClick={() => onAddBookToPlaylist(book)}> + </Button></td>
        </tr>
      )
    })
  }

  const renderMovieTableData = () => {
    return libraryMovies.map((movie, index) => {
      return (
        <tr key={movie.title}>
          <td>{movie.title}</td>
          <td>{movie.author}</td>
          <td><Button onClick={() => onAddMovieToPlaylist(movie)}> + </Button></td>
        </tr>
      )
    })
  }

  const renderPlaylistBookTableData = () => {
    return books.map((book, index) => {
      return (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td><Button onClick={() => onRemoveBookFromPlaylist(book)}> - </Button></td>
        </tr>
      )
    })
  }

  const renderPlaylistMovieTableData = () => {
    return movies.map((movie, index) => {
      return (
        <tr key={movie.title}>
          <td>{movie.title}</td>
          <td>{movie.author}</td>
          <td><Button onClick={() => onRemoveMovieFromPlaylist(movie)}> - </Button></td>
        </tr>
      )
    })
  }

  const onAddBookToPlaylist = (book) => {
    setBooks(books.concat(book));
    removeBookFromLibraryOptions(book);
  }

  const onAddMovieToPlaylist = (movie) => {
    setMovies(movies.concat(movie));
    removeMovieFromLibraryOptions(movie);
  }

  const removeBookFromLibraryOptions = (removedBook) => {
    setLibraryBooks(libraryBooks.filter(function (book) {
        return book !== removedBook
      })
    );
  }

  const removeMovieFromLibraryOptions = (removedMovie) => {
    setLibraryMovies(libraryMovies.filter(function (movie) {
        return movie !== removedMovie
      })
    );
  }

  const addBookBackToLib = (book) => {
    setLibraryBooks(libraryBooks.concat(book))
  }

  const addMovieBackToLib = (movie) => {
    setLibraryMovies(libraryMovies.concat(movie))
  }

  const onRemoveBookFromPlaylist = (removedBook) => {
    setBooks(books.filter(function (book) {
        return book !== removedBook
      })
    );
    addBookBackToLib(removedBook);
  }

  const onRemoveMovieFromPlaylist = (removedMovie) => {
    setMovies(movies.filter(function (movie) {
        return movie !== removedMovie
      })
    );
    addMovieBackToLib(removedMovie);
  }

  return (
    <Container>
      <Row className="inspect-playlist-title">
        <Col>
          <h1>Edit Playlist</h1>
        </Col>
      </Row>
      <Row>
        <Col className="inspect-playlist-name">
          <input
            type="text"
            name="playlistName"
            id="playlistName"
            placeholder="Enter playlist name."
            value={thePlaylistName}
            onChange={changePlaylistName}
          ></input>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>In Your Playlist</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Books</h2>
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
              {renderPlaylistBookTableData()}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Movies</h2>
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
              {renderPlaylistMovieTableData()}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Library Options</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Books</h2>
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
              {renderBookTableData()}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Movies</h2>
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
              {renderMovieTableData()}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="save-btn">
        <Col>
          <Button onClick={onSubmit}>Save</Button>
        </Col>
      </Row>
    </Container>
  );
}
