"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const h1 = document.querySelector('h1')

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const buttonScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");

buttonScrollTo.addEventListener("click", (event) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(event.target.getBoundingClientRect());
  console.log("window scroll", scrollX, scrollY);

  //scrolling function for old browser

  // window.scrollTo(s1coords.left + window.pageXOffset,  s1coords.top + window.pageYOffset)

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });

  //scrolling function for new browser
  section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll(".nav__link").forEach((event) => {
//   event.addEventListener(
//     "click",
//     (event) => {
//       event.preventDefault();
//       if (event.target.textContent.toLowerCase() === "features") {
//         section1.scrollIntoView({ behavior: "smooth" });
//       } else if (event.target.textContent.toLowerCase() === "operations") {
//         section2.scrollIntoView({ behavior: "smooth" });
//       } else if (event.target.textContent.toLowerCase() === "testimonials") {
//         section3.scrollIntoView({ behavior: "smooth" });
//       } else console.log("nav invalid ");
//     },
//     true
//   );
// });

document.querySelector(".nav__links").addEventListener("click", (event) => {
  event.preventDefault();
  // matching strategy
  if (event.target.classList.contains("nav__link")) {
    const id = event.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});


// Dom traversing

console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes)
console.log(h1.children)
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'white'
-
// parent
console.log(h1.parentNode)
console.log(h1.closest('.header'))
h1.closest('.header').style.background = 'var(--color-secondary-darker)'
h1.closest('h1').style.background = 'var(--gradient-primary)'

// sibling

console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)
console.log(h1.nextSibling)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

// console.log(document.querySelector('.header'))
// console.log(document.querySelectorAll('.section'))
// console.log(document.getElementById('section--3'))
// console.log(document.getElementsByTagName('button'))
// console.log(document.getElementsByClassName('btn'))

// const message =  document.createElement('div')
// message.classList.add('cookie-message')
// message.textContent = 'we use cookies for analytics'
// message.innerHTML = 'we use cookies for analytics <button class="btn btn--close--cookie">Got it</button>'

// // document.querySelector('.header').prepend(message)
// document.querySelector('.header').append(message)
// // document.querySelector('.header').append(message.cloneNode(true))

// // document.querySelector('.header').before(message)
// document.querySelector('.header').after(message)

// document.querySelector(".btn--close--cookie").addEventListener( 'click', () => {
//     message.remove()
// })

// //style
// message.style.backgroundColor = '#37383d'
// document.documentElement.style.setProperty('--color-primary', 'orangered')

// //attributes
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt)
// console.log(logo.src)
// console.log(logo.className)

// //classes - mostly dont use it overrieds the existing calsses
// logo.classList.add()
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()

// Event listners

// const h1 = document.querySelector('h1')

// // old way to access event listner
// h1.onmouseenter = () =>{
//     alert('mouse enter event listner new ')
// }

// // new way to access event listner - we can add multiple event using it
// h1.addEventListener('mouseenter', () =>{
//     alert('mouse enter event listner')

//     // h1.removeEventListener('mouseenter', nameofFunction)
// })

// const randomInt = (min,max) => Math.floor(Math.random() * (max-min +1) + min)
// const randomColor = () =>{
//    return `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`
// }

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//     console.log('nav__link')
//     this.style.backgroundColor = randomColor()
// })

// document.querySelector('.nav__links').addEventListener('click', (e) =>{
//     console.log('nav__links')
//     document.querySelector('.nav__links').style.backgroundColor = randomColor()
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//     console.log('nav',randomColor())
//     this.style.backgroundColor = randomColor()
// })
