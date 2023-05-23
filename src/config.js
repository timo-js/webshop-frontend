let config = {
  zammadEndpoint: "",
  apiEndpoint: "http://localhost:3000/api/article",
  shoppingcartEndpoint: "http://localhost:3000/api/shoppingcart",
  accountingEndpoint: "http://localhost:3000/api/accounting",
  categoryEndpoint: "http://localhost:3000/api/category",
  authEndpoint: "http://localhost:3000/api/login",
  pageSize: localStorage.getItem("max-items")
    ? Number(localStorage.getItem("max-items"))
    : 6,
};

if (process.env.NODE_ENV === "production") {
  config = {
    zammadEndpoint: "",
    apiEndpoint: "https://demo-webshop.timo-vink.de/api/article",
    shoppingcartEndpoint: "https://demo-webshop.timo-vink.de/api/shoppingcart",
    accountingEndpoint: "https://demo-webshop.timo-vink.de/api/accounting",
    categoryEndpoint: "https://demo-webshop.timo-vink.de/api/category",
    authEndpoint: "https://demo-webshop.timo-vink.de/api/login",
    pageSize: localStorage.getItem("max-items")
      ? Number(localStorage.getItem("max-items"))
      : 6,
  };
}

export default config;
