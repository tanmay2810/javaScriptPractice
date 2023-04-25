"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
// https://restcountries.com/v3.1/name/

const getCountryData = (country) => {
  // old API calls using XMLHttpRequest
  const requset = new XMLHttpRequest();
  requset.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  requset.send();
  // console.log(requset.responseText);
  let data;
  requset.addEventListener("load", function () {
    data = JSON.parse(this.responseText);
    console.log(data);

    const html = `
<article class="country">
    <img class="country__img" src="${data[0].flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${data[0].name.common}</h3>
        <h4 class="country__region">${data[0].region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data[0].population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data[0].language}</p>
        <p class="country__row"><span><img src="img/icon.png" height="28px" width="25px"/></span>${
          data[0].subregion
        }</p>
    </div>
</article>
<br>
`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1
  });
};

getCountryData("bharat");
getCountryData("usa")
getCountryData("australia")
getCountryData("brazil")

