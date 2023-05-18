"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const imageContainer = document.querySelector(".images")
// https://restcountries.com/v3.1/name/

const errorHandling = (message) => {
  countriesContainer.insertAdjacentText("beforeend", message);
  countriesContainer.style.opacity = 1;
};

const renderCountry = (datas, className = "") => {
  let html = "";
  datas.forEach((data) => {
    html += `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.language}</p>
      <p class="country__row"><span><img src="img/icon.png" height="28px" width="25px"/></span>${
        data.subregion
      }</p>
  </div>
</article>
`;
  });
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = (country) => {
//   // old API calls using XMLHttpRequest
//   const requset = new XMLHttpRequest();
//   requset.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   requset.send();
//   // console.log(requset.responseText);
//   let data;
//   requset.addEventListener("load", function () {
//     data = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data[0].flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data[0].name.common}</h3>
//         <h4 class="country__region">${data[0].region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data[0].population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data[0].language}</p>
//         <p class="country__row"><span><img src="img/icon.png" height="28px" width="25px"/></span>${
//           data[0].subregion
//         }</p>
//     </div>
//   </article>
// `;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1
//   });
// };

// getCountryData("bharat");
// getCountryData("usa")
// getCountryData("australia")
// getCountryData("brazil")

// let con;
// const getCountryAndNeighbor = (country) => {
//   // old API calls using XMLHttpRequest
//   const requset = new XMLHttpRequest();
//   requset.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   requset.send();
//   // console.log(requset.responseText);
//   let data;
//   requset.addEventListener("load", function () {
//     data = JSON.parse(this.responseText);
//     console.log(data);
//     con = data;
//     renderCountry(data);
//     let neighbours = [];
//     // console.log(con[0].borders)
//     for (let i = 0; i < con.length; i++) {
//       let c = con[i].borders;
//       for (let j = 0; j < c.length; j++) neighbours.push(c[j]);
//     }

//     if (!neighbours) return;

//     neighbours.forEach((neighbour) => {
//       const requset = new XMLHttpRequest();
//       requset.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
//       requset.send();

//       requset.addEventListener("load", function () {
//         data = JSON.parse(this.responseText);
//         renderCountry(data,'neighbour');
//       });
//     });
//   });
// };

// getCountryAndNeighbor("bharat");

// const getCountryData = function(country){
//   const resopnse = fetch(`https://restcountries.com/v3.1/name/${country}`).then((response)=>{
//     return response.json()
//   }).then((data) =>{
//     console.log(data)
//     renderCountry(data)
//   })
// }

// getCountryData('bharat')

// ------------------------------------------------------------------------------------------------------------------------------------
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data);
//       const neighbours = data[0].borders[0];
//       console.log(neighbours);
//       if (!neighbours) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbours}`);
//     })
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((error) => {
//       console.error("error " + error);
//       errorHandling(error);
//     })
//     .finally(() => {
//       console.log("finally block");
//     });
// };

// ------------------------------------------------------------------------------------------------------------------------------------

const getJson = (url, errorMessage = "Something went wrong") => {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${response.status} ${errorMessage}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJson(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data);
      const neighbours = data[0].borders[0];
      if (!neighbours) throw new Error("No neighbour");

      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighbours}`,
        "Neighbour countries not found."
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error("error " + error);
      errorHandling(error);
    })
    .finally(() => {
      console.log("finally block");
    });
};

btn.addEventListener("click", () => {
  getCountryData("bharat");
});
// getCountryData("123");

// challenge 1

// let coords = []
// navigator.geolocation.getCurrentPosition((position) =>{
//   coords.push(position.coords.latitude)
//   coords.push(position.coords.longitude)
// },() =>{
//   console.log('could not get ur location')
// })

// console.log(coords)

// fetch(`https://geocode.xyz/${coords[0]},${coords[1]}?geoit=json`).then( (response) =>{
//   console.log(response)
//   if(!response.ok) throw new Error('API not working')
//   response.json()
// }).then((data) => console.log(data.city)).catch(error => { console.error(error) }).finally( () => console.log('finally'))

// const result =  fetch(`https://restcountries.com/v3.1/name/${'usa'}`).then((response) => {
//   if (!response.ok) throw new Error(`${response.status}`);
//   return response.json();
// });
// console.log(result.then(data => console.log(data)),'log')

// -----------------------------------------------------------------
// building own promises

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("lottery draw is happening");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("U won");
    } else reject(new Error("U lost"));
  }, 2000);
});

// prettier-ignore
// lotteryPromise.then(data => console.log(data)).catch(error => console.error(error))

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log("1 sec delay");
//     return wait(2);
//   })
//   .then(() => console.log("2 sec delay"));

// // navigator.geolocation.getCurrentPosition(
// //   (position) => console.log(position),
// //   (error) => console.log(error)
// // );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // both works
//     // navigator.geolocation.getCurrentPosition( resolve(position), reject('location not found') )
//     navigator.geolocation.getCurrentPosition(
//       resolve,
//       reject
//     );
//   });
// };
// getPosition()
//   .then((position) => {
//     const { latitude: lat, longitude: lng } = position.coords;
//     console.log(lat, lng);
//   })
//   .catch(() => console.log('error'));

// getPosition()
//   .then((position) => {
//     const { latitude: lat, longitude: lng } = position.coords;

//     return fetch(`https://geocode.xyz/${coords[0]},${coords[1]}?geoit=json`);
//   })
//   .then((resposne) => resposne.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// ---------------------------------------------------------------------
// coding chalange 2

// let currentImg
// const createImage = function(url){
//   return new Promise(function(resolve,reject){
//     const img = document.createElement('img')
//     console.log(url)
//     img.src = url

//     img.addEventListener('load', function(){
//       imageContainer.append(img)
//       resolve(img)
//     })

//     img.addEventListener('error', function(){
//       reject(new Error('img not found'))
//     })
//   })
// }
// createImage('img/img-1.jpg').then(img => {
//   currentImg = img
//   console.log('success 1')
//   return wait(2)
// }).then(
//   () =>{
//     currentImg.style.display = "none"
//     return createImage('img/img-2.jpg')
//   }
// ).then(img => {
//   currentImg = img
//   console.log('success 2')
//   return wait(2)
// }).then(
//   () =>{
//     // currentImg.style.display = "none"
//   }
// )
// .catch( error => console.log(error))


// async await


const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // both works
    // navigator.geolocation.getCurrentPosition( resolve(position), reject('location not found') )
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject
    );
  });
};

const wherAmI = async function(country){
  const position =  await getPosition()
  const { latitude: lat, longitude: lng } = position.coords;
  console.log(lat,lng)
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
  const data = res.json()
  return data
}

wherAmI('bharat').then( data => renderCountry(data) )

fetch(`https://geocode.xyz/${coords[0]},${coords[1]}?geoit=json`).then( (response) =>{
  console.log(response)
  if(!response.ok) throw new Error('API not working')
  response.json()
}).then((data) => console.log(data.city)).catch(error => { console.error(error) }).finally( () => console.log('finally'))