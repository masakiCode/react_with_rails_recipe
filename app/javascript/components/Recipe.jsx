import React from "react";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: { ingredients: "", editable: false} }
    /*this.state = { editable: false}*/
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipes"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  /*updateRecipe(recipe)
  {
    let newRecipes = this.state.recipes.filter((f) => f.id !== recipe.id)
    newRecipes.push(recipe)
    this.setState({recipes: newRecipes
    })
  }*/

  handleUpdate()
  {
    this.setState({
      editable: !this.state.editable
    })
  }

 /* handleUpdate()
  {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/edit/${id}`;
    fetch(url,
    {
      method: 'PUT',
      body: JSON.stringify({recipe: recipe}),
      headers: { 'Content-Type': "application/json"}
    }
  }).then((response) => { this.updateRecipe(recipe)})
}*/

  deleteRecipe() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/recipes"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { recipe } = this.state;
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteRecipe}>
                Delete Recipe
              </button>
              <Link to="/update" type="button" className="btn custom-button" onClick={this.handleUpdate}>
                Update Recipe
              </Link>
            </div>
        </div>
          <Link to="/recipes" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

}

export default Recipe;
