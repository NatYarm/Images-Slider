'use strict';

const slider = document.querySelector('.slider');
const slideImage = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--left');
const nextBtn = document.querySelector('.slider__btn--right');
const navDots = document.querySelector('.navigation-dots');

//Counter
let curSlide = 0;
let numOfImages = slideImage.length;
let size;

//const slideWidth = slideImage[0].clientWidth;

//Set up the slider

function init() {
  slideImage.forEach((img, i) => {
    img.style.left = i * 100 + '%';
  });
  slideImage[0].classList.add('active');

  createNavDots();
}

init();

window.addEventListener('resize', () => {
  slider.style.transition = 'none';
  setSize();
});

function setSize() {
  size = slideImage[0].clientWidth;
  slider.style.transform = `translateX(${-size * curSlide}px)`;
}

function goToSlide(slideNum) {
  slider.style.transition = 'transform 0.6s ease-in-out';
  setSize();
  curSlide = slideNum;

  setActiveClass();
}

// Create navigation dots

function createNavDots() {
  for (let i = 0; i < numOfImages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    navDots.appendChild(dot);
    dot.addEventListener('click', () => {
      goToSlide(i);
      setSize();
    });
  }
  navDots.children[0].classList.add('active');
}

// Next Button
nextBtn.addEventListener('click', () => {
  if (curSlide === numOfImages - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  return;
});

// Prev Button
prevBtn.addEventListener('click', () => {
  if (curSlide === 0) {
    curSlide = numOfImages - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  return;
});

//Set Active class
function setActiveClass() {
  // Set active class for slide image
  let currentActive = document.querySelector('.slide.active');
  currentActive.classList.remove('active');
  slideImage[curSlide].classList.add('active');

  // set active class for nav dots
  let currentDot = document.querySelector('.dot.active');
  currentDot.classList.remove('active');
  navDots.children[curSlide].classList.add('active');
}
