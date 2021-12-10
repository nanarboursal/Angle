import React, { useState, useEffect } from "react";
import { getBooks, getMovies, getPlaylistBooks, getPlaylistMovies, updatePlaylist } from "../../Functions/UserFunctions";
import { BsArrowUpRightCircleFill, BsFillArrowUpRightCircleFill } from "react-icons/bs";
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
        // setLibraryBooks(res.filter(checkIfBookAlreadyInPlaylist));
      } else {
        alert("error");
      }
    });
    getMovies().then(res => {
      if (!res.error && !res.result) {
        setLibraryMovies(res);
        // setLibraryMovies(res.filter(checkIfMovieAlreadyInPlaylist));
      } else {
        alert("error");
      }
    });
  }, []);

  // function checkIfBookAlreadyInPlaylist(book){
  //   const tryToFilter = books.filter(findBook => findBook.mediaID === book.mediaID);
  //   if(tryToFilter.length > 0){
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // function checkIfMovieAlreadyInPlaylist(movie){
  //   if(!movies.includes(movie)){
  //     return true;
  //   }
  //   return false;
  // };

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
          <td style={{ fontStyle: "italic", fontWeight: "bold" }}>{book.title}</td>
          <td>{book.author}</td>
          <td><Button style={{ width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => onAddBookToPlaylist(book)}> + </Button></td>
        </tr>
      )
    })
  }

  const renderMovieTableData = () => {
    return libraryMovies.map((movie, index) => {
      return (
        <tr key={movie.title}>
          <td style={{ fontStyle: "italic", fontWeight: "bold" }}>{movie.title}</td>
          <td>{movie.author}</td>
          <td><Button style={{ width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => onAddMovieToPlaylist(movie)}> + </Button></td>
        </tr>
      )
    })
  }

  const renderPlaylistBookTableData = () => {
    return books.map((book, index) => {
      return (
        <tr key={book.title}>
          <td style={{ fontStyle: "italic", fontWeight: "bold" }}>{book.title}</td>
          <td>{book.author}</td>
          <td><Button style={{ width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => onRemoveBookFromPlaylist(book)}> - </Button></td>
          <td><a style={{cursor: "pointer"}} onClick={() => inspectMedia(book)}><BsArrowUpRightCircleFill/></a></td>
        </tr>
      )
    })
  }

  const renderPlaylistMovieTableData = () => {
    return movies.map((movie, index) => {
      return (
        <tr key={movie.title}>
          <td style={{ fontStyle: "italic", fontWeight: "bold" }}>{movie.title}</td>
          <td>{movie.author}</td>
          <td><Button style={{ width: "50px", backgroundColor: 'white', color: "#293b3f", borderWidth: "4px", borderColor: "#293b3f", fontSize: "1.3rem", borderRadius: 8 }} onClick={() => onRemoveMovieFromPlaylist(movie)}> - </Button></td>
          <td><a style={{cursor: "pointer"}} onClick={() => inspectMedia(movie)}><BsArrowUpRightCircleFill/></a></td>
        </tr>
      )
    })
  }

  const inspectMedia = (media) => {
    const mediaID = media.title + "&&&&" + media.author;
    const mediaType = media.mediaType;
    const notes = media.notes;
    const rating = media.rating;
    history.push("/inspectmedia/" + mediaType + "/" + mediaID + "/" + notes + "/" + rating);
  };

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
    <div className="inspect-playlist-page">
      <Container>
        <Row>
          <Col>
            <h1 className="inspect-playlist-title">Inspect Playlist</h1>
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
            <h1 className="inspect-table-top-header-title">In Your Playlist</h1>
          </Col>
        </Row>
        <div className="inspect-table-list-div">

          <Row>
            <Col>
              <h2 className="inspect-table-top-title">Books</h2>
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
                    <th>See Media</th>
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
              <h2 className="inspect-table-top-title">Movies</h2>
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
                    <th>See Media</th>
                  </tr>
                </thead>
                <tbody>
                  {renderPlaylistMovieTableData()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            <h1 className="inspect-table-top-header-title">Library Options</h1>
          </Col>
        </Row>
        <div className="inspect-table-list-div">
          <Row>
            <Col>
              <h2 className="inspect-table-top-title">Books</h2>
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
              <h2 className="inspect-table-top-title">Movies</h2>
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
        </div>
        <Row>
          <Col>
            <div className="save-play-button-col">
              <Button className="save-playlist-btn" onClick={onSubmit}>Save</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
