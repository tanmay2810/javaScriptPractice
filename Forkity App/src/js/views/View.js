import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Render the recived object to the DOM
   * @param {object} data The data to be renderd (e.g. recipe)
   * @param {object} [render=true] If false, creates markup string of rendering to the dom 
   * @returns {undefined | string} A markup is returned if render=false
   * @this {Object} View instance
   */

  render(data,render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._genrateMarkup();
    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const markup = this._genrateMarkup();
    const dom = document.createRange().createContextualFragment(markup);
    const element = Array.from(dom.querySelectorAll("*"));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    element.forEach((el, i) => {
      const curEl = currentElement[i];
      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim("") !== "") {
        curEl.textContent = el.textContent;
      }
      if (!el.isEqualNode(curEl)) {
        Array.from(el.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(errorMessage = this._errorMessgae) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${errorMessage}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSuccess(successMessage = this._successMessgae) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${successMessage}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
