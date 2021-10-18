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
