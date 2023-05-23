import http from "./httpService";
import config from "../config.js";

export async function auth({ username, password }) {
  return await http
    .post(config.authEndpoint, {
      username: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response.data) {
        alert(error.response.data);
        throw new Error(error.response.data);
      } else throw new Error(error);
    });
}
