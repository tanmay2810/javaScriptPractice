"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const h1 = document.querySelector("h1");

const buttonScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

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

tabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");
  console.log(clicked);

  if (!clicked) return;

  // Remove Active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((tabContent) =>
    tabContent.classList.remove("operations__content--active")
  );

  // Activate tabs
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation

// const handleHover = function (event, opacity) {
//   if (event.target.classList.contains("nav__link")) {
//     const link = event.target;
//     const otherLinks = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     otherLinks.forEach((ol) => {
//       if (ol !== link) ol.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

const handleHover = function (event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const otherLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    otherLinks.forEach((ol) => {
      if (ol !== link) ol.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener("mouseover", (event) => handleHover(event, 0.5));
// nav.addEventListener("mouseout", (event) => handleHover(event, 1));

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// sticky navigation
// const initalcoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", () => {
//   if (window.scrollY > initalcoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// sticky navigation - Intersection observer API
// const observerCallBack = (entries, observer) =>{
//   entries.forEach(entry => {console.log(entry)})
// }

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(observerCallBack, observerOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((s) => {
  sectionObserver.observe(s);
  s.classList.add("section--hidden");
});

// Lazy loading images

const imgTargets = document.querySelectorAll("img[data-src]");
const loading = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: "80px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slider = document.querySelector(".slider");

const maxSlide = slides.length;

let curSlide = 0;

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);
const nextSlide = () => {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
};

const prevSlide = () => {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") prevSlide();
  if (event.key === "ArrowRight") nextSlide();
});


// Dom traversing

// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'white'
// -
// // parent
// console.log(h1.parentNode)
// console.log(h1.closest('.header'))
// h1.closest('.header').style.background = 'var(--color-secondary-darker)'
// h1.closest('h1').style.background = 'var(--gradient-primary)'

// // sibling

// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// console.log(h1.nextSibling)

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
