import http from "./httpService";
import config from "../config.js";

const getToken = async () => {
  return sessionStorage.getItem("token");
};

export async function saveOrder(products, information, accounting, user, sum) {
  const token = await getToken();
  const date = new Date().toLocaleString("en-gb", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const userInformation = user.displayName + " (" + user.username + ")";

  return new Promise((resolve, reject) => {
    http
      .post(
        config.shoppingcartEndpoint,
        {
          orders: products,
          information: information,
          accounting: accounting,
          orderDate: date,
          status: "",
          orderedBy: userInformation,
          orderedByMail: user.mail,
          priceTotalAmount: sum,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        return resolve(response);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}
