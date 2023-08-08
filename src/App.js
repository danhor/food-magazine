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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Recipe Modal"
        className="modal-dialog modal-dialog-centered"
      >
        {/* <div className="modal-content"> */}
        <div className="modal-content" style={{ backgroundColor: "#68b80d" }}>
          <div className="modal-header">
            <h2 className="modal-title">
              {editingRecipe ? "Edit Recipe" : "Add Recipe"}
            </h2>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingRecipe ? editingRecipe.name : newRecipe.name}
                  onChange={(e) =>
                    editingRecipe
                      ? setEditingRecipe({
                          ...editingRecipe,
                          name: e.target.value,
                        })
                      : setNewRecipe({ ...newRecipe, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                  className="form-control"
                  value={
                    editingRecipe
                      ? editingRecipe.description
                      : newRecipe.description
                  }
                  onChange={(e) =>
                    editingRecipe
                      ? setEditingRecipe({
                          ...editingRecipe,
                          description: e.target.value,
                        })
                      : setNewRecipe({
                          ...newRecipe,
                          description: e.target.value,
                        })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ingredients:</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    editingRecipe
                      ? editingRecipe.ingredients.join(", ")
                      : newRecipe.ingredients.join(", ")
                  }
                  onChange={(e) =>
                    editingRecipe
                      ? setEditingRecipe({
                          ...editingRecipe,
                          ingredients: e.target.value.split(", "),
                        })
                      : setNewRecipe({
                          ...newRecipe,
                          ingredients: e.target.value.split(", "),
                        })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image Upload:</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const uploadedImage = event.target.result;
                      if (editingRecipe) {
                        setEditingRecipe({
                          ...editingRecipe,
                          image: uploadedImage,
                        });
                      } else {
                        setNewRecipe({
                          ...newRecipe,
                          image: uploadedImage,
                        });
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (editingRecipe) {
                    handleEditRecipe(editingRecipe);
                  } else {
                    setRecipes([...recipes, newRecipe]);
                  }
                  closeModal();
                }}
              >
                {editingRecipe ? "Save Changes" : "Add Recipe"}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
