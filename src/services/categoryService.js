import http from "./httpService";
import config from "../config.js";

const getToken = async () => {
  return sessionStorage.getItem("token");
};

export async function getCategorys() {
  return await http.get(config.categoryEndpoint);
}

export async function saveCategory(name) {
  const token = await getToken();
  return await http
    .post(config.categoryEndpoint + "/", name, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      alert(err.response.data);
    });
}

export async function editCategory(id, name) {
  const token = await getToken();
  return await http
    .put(
      config.categoryEndpoint + "/" + id,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .catch((err) => {
      alert(err.response.data);
    });
}

export async function deleteCategory(id) {
  const token = await getToken();
  return await http
    .delete(config.categoryEndpoint + "/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      alert(err.response.data);
    });
}
