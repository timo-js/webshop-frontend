import http from "./httpService";
import config from "../config.js";

const getToken = async () => {
  return sessionStorage.getItem("token");
};

export async function getAccounting() {
  const token = await getToken();

  return await http
    .get(config.accountingEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}
