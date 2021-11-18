import axios from "axios";
import jwt_decode from "jwt-decode";

export const register = newUser => {
  return axios
    .post("http://10.0.0.179:80/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = user => {
  return axios
    .post("http://10.0.0.179:80/users/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data.token);
      console.log("data: ", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addMedia = media => {
  // used to determine email
  // const theToken = localStorage.getItem("usertoken");
  // const decodedToken = jwt_decode(theToken);
  // console.log(decodedToken);
  // const email = decodedToken.sub.email;
  // console.log("this is the email after adding media", email);

  return axios
    .post("http://10.0.0.179:80/libraries/addmedia", {
      email: "nanarb@gmail.com", // have to fix later
      mediaType: media.mediaType,
      title: media.title,
      author: media.author,
      notes: media.notes,
      rating: media.rating
    })
    .then(response => {
      console.log("user functions response", response);
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBooks = () => {
  // return axios.get("http://10.0.0.179:80/libraries/getlibrary", {
  //   email: "nanarb@gmail.com"
  // })
  return axios.get("http://10.0.0.179:80/libraries/getbooks")
  .then(response => {
    return response.data.result;
  })
  .catch(err => {
    console.log(err);
  });
};

export const getMovies = () => {
  // return axios.get("http://10.0.0.179:80/libraries/getlibrary", {
  //   email: "nanarb@gmail.com"
  // })
  return axios.get("http://10.0.0.179:80/libraries/getmovies")
  .then(response => {
    return response.data.result;
  })
  .catch(err => {
    console.log(err);
  });
};

export const deleteMedia = media => {
  // used to determine email
  // const theToken = localStorage.getItem("usertoken");
  // const decodedToken = jwt_decode(theToken);
  // console.log(decodedToken);
  // const email = decodedToken.sub.email;
  // console.log("this is the email after adding media", email);

  return axios
    .post("http://10.0.0.179:80/libraries/deletemedia", {
      email: "nanarb@gmail.com", // have to fix later
      mediaType: media.mediaType,
      title: media.title,
      author: media.author
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addPlaylist = playlist => {
  // used to determine email
  // const theToken = localStorage.getItem("usertoken");
  // const decodedToken = jwt_decode(theToken);
  // console.log(decodedToken);
  // const email = decodedToken.sub.email;
  // console.log("this is the email after adding media", email);

  return axios
    .post("http://10.0.0.179:80/playlists/addplaylist", {
      email: "nanarb@gmail.com", // have to fix later
      playlistName: playlist.playlistName,
      books: playlist.books,
      movies: playlist.movies
    })
    .then(response => {
      console.log("user functions response", response);
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPlaylists = () => {
  // return axios.get("http://10.0.0.179:80/libraries/getlibrary", {
  //   email: "nanarb@gmail.com"
  // })
  return axios.get("http://10.0.0.179:80/playlists/getplaylists")
  .then(response => {
    return response.data.result;
  })
  .catch(err => {
    console.log(err);
  });
};

export const deletePlaylist = playlist => {
  // used to determine email
  // const theToken = localStorage.getItem("usertoken");
  // const decodedToken = jwt_decode(theToken);
  // console.log(decodedToken);
  // const email = decodedToken.sub.email;
  // console.log("this is the email after adding media", email);

  return axios
    .post("http://10.0.0.179:80/playlists/deleteplaylist", {
      email: "nanarb@gmail.com", // have to fix later
      playlistName: playlist.playlistName
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};
