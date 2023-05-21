
import "core-js";
import "regenerator-runtime";
import { state, loadRecipe } from "./model";
import recipeView from "./views/recipeView";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

console.log("Hello");



const controllerRecipe = async function (id) {
  try {
    recipeView.renderSpinner
    // const id = window.location.hash.slice(1)
    // console.log(id)
    if (!id) return

    // loading recipe
    await loadRecipe(id)
    
    // Rendering recipe
    recipeView.render(state.recipe)
  } catch (error) {
    alert(error);
  }
};

['hashchange','load'].forEach(ev => window.addEventListener(ev, controllerRecipe('5ed6604591c37cdc054bcb34')))

// window.addEventListener('hashchange', showRecipe('5ed6604591c37cdc054bcb34'))
// window.addEventListener('load', showRecipe('5ed6604591c37cdc054bcb34'))

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
