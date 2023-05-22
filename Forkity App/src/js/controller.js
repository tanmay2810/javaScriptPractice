import "core-js";
import "regenerator-runtime";
import {
  state,
  loadRecipe,
  loadSecrchResults,
  getSearchResultPage,
  updateServings,
  addBookmark,
  reomveBookmark,
  uploadRecipe,
} from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import AddRecipeView from "./views/AddRecipeView";
import { MODAL_CLOSE_SEC } from "./config";
import View from "./views/View";

const recipeContainer = document.querySelector(".recipe");

// if (module.hot){
//   module.hot.accept();
// }

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controllerRecipe = async function () {
  try {
    recipeView.renderSpinner;
    const id = window.location.hash.slice(1);

    if (!id) return;

    resultsView.update(getSearchResultPage());
    // updating bookmark view
    bookmarksView.update(state.bookmarks);

    // loading recipe
    await loadRecipe(id);

    // Rendering recipe
    recipeView.render(state.recipe);

    // test
    // controlServings();
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

const controlSearchReults = async () => {
  try {
    resultsView.renderSpinner();

    // get search querry
    const query = searchView.getQuery();
    if (!query) return;

    // load reults
    await loadSecrchResults(query);
    console.log(state.search.results);
    resultsView.render(getSearchResultPage());

    // render pagination buttons
    paginationView.render(state.search);

    // render results
  } catch (error) {
    console.error(error);
  }
};

const controlePagination = (gotoPage) => {
  // rendering the new results
  resultsView.render(getSearchResultPage(gotoPage));

  // rendering the new pagination button
  paginationView.render(state.search);
};

const controlServings = (newServings) => {
  // update the recipe servings (in the state)
  updateServings(newServings);

  // update the view
  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
};

const controlAddBookmark = () => {
  // Add or meove bookmark
  if (!state.recipe.bookmark) addBookmark(state.recipe);
  else reomveBookmark(state.recipe.id);

  // update recipe view
  // console.log(state.recipe)
  recipeView.update(state.recipe);

  // render the bookmarks
  bookmarksView.render(state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(state.bookmarks);
};

const controlAddRecipe = async (newRecipe) => {
  // console.log(newRecipe);

  try{
    // show loading spinner
    AddRecipeView.renderSpinner()
    
    await uploadRecipe(newRecipe);
    console.log(state.recipe)

    // render recipe
    recipeView.render(state.recipe)

    // success message
    AddRecipeView.renderSuccess();
    
    //render the bookmark section 
    bookmarksView.render(state.bookmarks)

    // change id in the url
    window.history.pushState(null,'',`#${state.recipe.id}`)

    // close form window
    setTimeout( () =>{
      AddRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000)

  }catch(error){
    console.error(error)
    AddRecipeView.renderError(error.message)
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRenderMethod(controllerRecipe);
  searchView.addHandlerSearch(controlSearchReults);
  paginationView.addHandlerClick(controlePagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

// ['load'].forEach(ev => window.addEventListener(ev, controllerRecipe()))

// window.addEventListener('hashchange', showRecipe('5ed6604591c37cdc054bcb34'))
// window.addEventListener('load', showRecipe('5ed6604591c37cdc054bcb34'))

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
