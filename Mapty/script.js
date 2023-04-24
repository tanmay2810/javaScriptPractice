"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      //   const coords = [18.66882, 73.78730];
      const coords = [latitude, longitude];
      console.log(position);
      console.log(latitude + " " + longitude);
      console.log(`https://www.google.com/maps/@${latitude}.${longitude}z`);

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords).addTo(map).bindPopup("current location").openPopup();

      map.on("click", (mapEvent) => {
        console.log(mapEvent);
        const { lat } = mapEvent.latlng
        const { lng } = mapEvent.latlng

        console.log(lat+' '+lng)
        L.marker([lat,lng]).addTo(map).bindPopup('Walking').openPopup()
      });
    },
    () => {
      alert("could not get your postion");
    }
  );
}

console.log(firstName);
