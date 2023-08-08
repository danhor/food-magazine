import React, { useState } from "react";
import "./App.css";
import recipesData from "./recipes.json";

const RecipeCard = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const handleToggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.name} />
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <button onClick={handleToggleIngredients} className="btn-details">
        {showIngredients ? "Hide Ingredients" : "View Ingredients"}
      </button>
      {showIngredients && (
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <h1>Food Magazine App</h1>
      <div className="recipe-container">
        {recipesData.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
export default App;
