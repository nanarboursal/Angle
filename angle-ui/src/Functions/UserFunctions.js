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
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addMedia = media => {
  // used to determine email
  const theToken = localStorage.getItem("usertoken");
  const decodedToken = jwt_decode(theToken);
  console.log(decodedToken);
  const email = decodedToken.sub.email;
  console.log("this is the email after adding media", email);

  return axios
    .post("http://10.0.0.179:80/libraries/addmedia", {
      email: email,
      mediaType: media.type,
      title: media.title,
      author: media.author,
      notes: media.notes,
      rating: media.rating
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};
