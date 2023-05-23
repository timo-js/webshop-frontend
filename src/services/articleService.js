import http from "./httpService";
import config from "../config.js";

const getToken = async () => {
  return sessionStorage.getItem("token");
};

export async function getArticles() {
  return await http.get(config.apiEndpoint);
}

export async function getArticle(id) {
  return await http.get(config.apiEndpoint + "/" + id);
}

export async function saveArticle(article) {
  const token = await getToken();
  if (article._id) {
    const body = { ...article };
    delete body._id;
    delete body.__v;
    return await http
      .put(config.apiEndpoint + "/" + article._id, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  return await http
    .post(config.apiEndpoint, article, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      alert(err.response.data);
    });
}

export async function deleteArticle(articleId) {
  const token = await getToken();
  return await http
    .delete(config.apiEndpoint + "/" + articleId, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      alert(err.response.data);
    });
}
