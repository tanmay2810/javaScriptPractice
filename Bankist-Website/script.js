"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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
  section1.scrollIntoView({behavior: 'smooth'})
});





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

const h1 = document.querySelector('h1')

// old way to access event listner
h1.onmouseenter = () =>{
    alert('mouse enter event listner new ')
}

// new way to access event listner - we can add multiple event using it
h1.addEventListener('mouseenter', () =>{
    alert('mouse enter event listner')

    // h1.removeEventListener('mouseenter', nameofFunction)
})

