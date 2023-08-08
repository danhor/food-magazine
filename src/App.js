import React, { useState } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import recipesData from "./recipes.json";

const RecipeCard = ({ recipe, onDelete, onEdit }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const handleToggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className="card mb-3">
      <img src={recipe.image} alt={recipe.name} className="card-img-top" />
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p className="card-text">{recipe.description}</p>
        <button
          className="btn btn-primary me-2"
          onClick={handleToggleIngredients}
        >
          {showIngredients ? "Hide Ingredients" : "View Ingredients"}
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={() => onEdit(recipe)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(recipe.id)}>
          Delete
        </button>
        {showIngredients && (
          <div className="ingredients mt-3">
            <h4>Ingredients:</h4>
            <ul className="list-group">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState(recipesData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    id: null,
    image: "",
    name: "",
    description: "",
    ingredients: [],
  });

  const handleAddRecipe = () => {
    setModalIsOpen(true);
    setEditingRecipe(null);
    setNewRecipe({
      id: null,
      image: "",
      name: "",
      description: "",
      ingredients: [],
    });
  };

  const handleEditRecipe = (editedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editedRecipe.id ? editedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setModalIsOpen(false);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingRecipe(null);
    setNewRecipe({
      id: null,
      image: "",
      name: "",
      description: "",
      ingredients: [],
    });
  };

  return (
    <div className="container">
      <h1 className="mt-4">Food Recipe App</h1>
      <button className="btn btn-primary mt-3" onClick={handleAddRecipe}>
        Add Recipe
      </button>
      <div className="row mt-3">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-lg-4">
            <RecipeCard
              recipe={recipe}
              onDelete={handleDeleteRecipe}
              onEdit={(recipe) => {
                setEditingRecipe(recipe);
                setModalIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
