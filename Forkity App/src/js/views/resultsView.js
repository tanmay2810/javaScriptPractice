import View from "./View";
import icons from "url:../../img/icons.svg";
import PreviewView from "./PreviewView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessgae = "No recipes found for your query. Please try again :(";
  _successMessgae = "";

  _genrateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join("");
  } 
}

export default new ResultsView();
