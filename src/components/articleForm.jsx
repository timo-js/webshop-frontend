import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCategorys } from "../services/categoryService";
import { getArticle, saveArticle } from "../services/articleService";
import { Navigate, useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ArticleForm extends Form {
  state = {
    data: { name: "", price: "", description: "", src: "", mercateoNr: "" },
    categorys: [],
    errors: {},
    redirect: false,
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Artikelbezeichnung"),
    price: Joi.number().required().min(0).label("Preis"),
    description: Joi.string().required().label("Artikelbeschreibung"),
    category: Joi.string().required().label("Kategorie"),
    src: Joi.string().required().label("Bildquelle"),
    mercateoNr: Joi.string().label("Mercateo Artikelnummer"),
    __v: Joi.number(),
  };

  async componentDidMount() {
    const categorys = await getCategorys();
    this.setState({ categorys });

    const { id } = this.props.params;
    if (id === undefined) return;

    try {
      const article = await getArticle(id);

      this.setState({ data: article.data });
    } catch {
      alert("Achtung, Artikel nicht mehr in der Datenbank zu finden!");
    }
  }

  doSubmit = () => {
    saveArticle(this.state.data);
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;

    return (
      <div>
        {redirect === true ? (
          <Navigate replace to="/article" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Artikelbezeichnung")}
            {this.renderInput("price", "Preis")}
            {this.renderInput("description", "Artikelbeschreibung")}
            {this.renderSelect(
              "category",
              "Kategorie",
              this.state.categorys.data
            )}
            {this.renderInput("src", "Bildquelle (Link)")}
            {this.renderInput("mercateoNr", "Artikelnummer")}
            {this.renderButton("Artikel hinzufügen")}
          </form>
        )}
      </div>
    );
  }
}

export default withParams(ArticleForm);
