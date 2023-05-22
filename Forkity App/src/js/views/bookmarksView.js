import View from "./View";
import icons from "url:../../img/icons.svg";
import PreviewView from "./PreviewView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessgae =
    "No recipes found in your bookmark section. Please try again :(";
  _successMessgae = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _genrateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
