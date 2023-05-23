import React from "react";
import Joi from "joi-browser";
import { saveCategory } from "../services/categoryService";
import Form from "./common/form";
import { Navigate } from "react-router-dom";

class CategoryForm extends Form {
  state = {
    data: { name: "" },
    errors: {},
    redirect: false,
  };

  schema = {
    name: Joi.string().required().label("Kategorie"),
  };

  doSubmit = () => {
    saveCategory(this.state.data);
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;

    return (
      <div>
        {redirect === true ? (
          <Navigate to="/article" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Kategorie")}
            {this.renderButton("Artikel hinzufügen")}
          </form>
        )}
      </div>
    );
  }
}

export default CategoryForm;
