"use strict";

// prettier-ignore

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  clicks = 0

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, log]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDecscription() {
    //prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // click(){
  //   this.clicks++
  // }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this._calcPace();
    this._setDecscription();
  }
  _calcPace() {
    this._pace = this.duration / this.distance;
    return this._pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this._calcSpeed();
    this._setDecscription();
  }

  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39,-12], 5.2,24,178)
// const cycle1 = new Cycling([39,-12], 27,95,532)
// console.log(run1,cycle1)

// Application Architecture
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #zoomLevel = 13;
  constructor() {

    //get user's postion
    this._getPosition();

    // get data form local storage
    this._getLocalStorage();

    //handler
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._movToPopUp.bind(this));
    
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert("could not get your postion");
      });
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    //   const coords = [18.66882, 73.78730];
    const coords = [latitude, longitude];
    // console.log(position);
    // console.log(latitude + " " + longitude);
    // console.log(`https://www.google.com/maps/@${latitude}.${longitude}z`);

    this.#map = L.map("map").setView(coords, this.#zoomLevel);

    this.#workouts.forEach(work => {{
      this._renderWorkoutMarker(work)
    }})

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords).addTo(this.#map).bindPopup("current location").openPopup();

    //   handling clicks on map
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";
    
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(event) {
    event.preventDefault();
    // get data form form
    const type = inputType.value;
    const distance = +inputDistance.value;
    // console.log(typeof distance);
    const duration = +inputDuration.value;
    // console.log(typeof duration);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // check if valid
    const valideInput = (...inputs) => {
      inputs.every((inp) => Number.isFinite(inp));
    };

    const isPositiveNumber = (...inputs) => {
      inputs.every((inp) => inp > 0);
    };
    // if running create running object or if cycling crate cycline object
    if (type.toLowerCase() === "running") {
      const cadence = +inputCadence.value;
      // console.log("cadence" + typeof cadence);
      if (
        valideInput(distance, duration, cadence) ||
        isPositiveNumber(distance, duration, cadence)
      )
        return alert("invalid input, input should be a number");

      workout = new Running([lat, lng], distance, duration, cadence);
    } else if (type.toLowerCase() === "cycling") {
      const elevation = +inputElevation.value;
      if (
        valideInput(distance, duration, elevation) ||
        isPositiveNumber(distance, duration)
      )
        return alert("invalid input, input should be a number");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);
    // console.log(workout);
    // add new object to workout array

    // render workout on map as a marker
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
    // hide form + clear inut field
    // console.log(this.#mapEvent);
    this._setLocalStorage();


    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(workout.description)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;
    if (workout.type === "running") {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout._pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
      </div>
      </li>
      `;
    }
    if (workout.type === "cycling") {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li> 
      `;
    }

    form.insertAdjacentHTML("afterend", html);

    this._hideForm();
  }

  _movToPopUp(e) {
    const workoutEl = e.target.closest(".workout");
    console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    console.log(workout);

    this.#map.setView(workout.coords, this.#zoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    workout.click()
  }

  _setLocalStorage(){
    localStorage.setItem('workouts',JSON.stringify(this.#workouts))
  }

  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'))
    
    if(!data) return

    this.#workouts = data

    this.#workouts.forEach(work => {{
      this._renderWorkout(work)
    }})
  }

  reset(){
    localStorage.removeItem('workouts');
    location.reload()
  }

}

const app = new App();
