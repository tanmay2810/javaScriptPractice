import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler){
    this._parentElement.addEventListener('click',(e) =>{
        const btn = e.target.closest('.btn--inline')
        if(!btn) return

        const gotoPage = btn.dataset.goto;        
        handler(gotoPage)
    })
  }

  _genrateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    const currentPage = this._data.page;
    // Page 1, and there are other pages
    if (+currentPage === 1 && numPages > 1)
      return this.#genrateNextMarkupButton(currentPage)

    // Last page
    if (+currentPage === numPages && numPages > 1)
      return this.#genratePreviousMarkupButton(currentPage)
    // Other pages
    if (+currentPage < numPages)
      return `${this.#genrateNextMarkupButton(currentPage)} ${this.#genratePreviousMarkupButton(currentPage)}`;

    // Page 1, and no other pages
    return "";
  }

  #genrateNextMarkupButton(currentPage) {
    return ` <button data-goto="${+currentPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${+currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  #genratePreviousMarkupButton(currentPage) {
    return ` <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;
  }
}

export default new PaginationView();
