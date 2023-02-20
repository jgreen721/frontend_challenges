var topLogo = document.querySelector(".top-logo");
var headerh1 = document.querySelector(".header-h1");
var headerP = document.querySelector(".header-p");
// var phoneImg = document.querySelector(".phone-img-container");
var mainSection = document.querySelector(".main-section");
var cardh2 = document.querySelector(".card-h2");
var cardBlurb = document.querySelector(".card-blurb");
var iosBtn = document.querySelector(".ios");
var androidBtn = document.querySelector(".android");
var price = document.querySelector(".price");
var footer = document.querySelector(".footer");
var footerLogo = document.querySelector(".footer-logo");
var footerBlurb = document.querySelector(".footer-blurb");
var footerLinks = document.querySelector(".footer-links");

var els = [
  topLogo,
  headerh1,
  headerP,
  //   phoneImg,
  //   cardh2,
  //   cardBlurb,
  //   iosBtn,
  //   androidBtn,
  //   footer,
];

var observer = new IntersectionObserver(flashAnimate);
var btnObserver = new IntersectionObserver(slideBtns);
var footerObserver = new IntersectionObserver(floatFooter, { threshold: ".5" });

function flashAnimate(entries) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("hide");
    entries[0].target.classList.add("show");
    // console.log("show");
  } else {
    entries[0].target.classList.remove("show");
    entries[0].target.classList.add("hide");
    // console.log("hide");
  }
}

function slideBtns(entries) {
  if (entries[0].isIntersecting) {
    androidBtn.classList.remove("slide");
    androidBtn.classList.add("slide-enter");
    iosBtn.classList.remove("slide");
    iosBtn.classList.add("slide-enter");
    cardh2.classList.add("slide-enter");
    cardBlurb.classList.add("slide-enter");
    cardh2.classList.remove("slide");
    cardBlurb.classList.remove("slide");
    price.classList.add("grow");
    price.classList.remove("shrink");
    // console.log("show");
  } else {
    androidBtn.classList.add("slide");
    androidBtn.classList.remove("slide-enter");
    iosBtn.classList.add("slide");
    iosBtn.classList.remove("slide-enter");
    cardh2.classList.remove("slide-enter");
    cardBlurb.classList.remove("slide-enter");
    cardh2.classList.add("slide");
    cardBlurb.classList.add("slide");
    price.classList.remove("grow");
    price.classList.add("shrink");
  }
}

function floatFooter(entries) {
  if (entries[0].isIntersecting) {
    footerLogo.classList.remove("hide");
    footerLogo.classList.add("show");
    footerBlurb.classList.remove("hide");
    footerBlurb.classList.add("show");
    footerLinks.classList.remove("hide");
    footerLinks.classList.add("show");
    console.log("show");
  } else {
    footerLogo.classList.remove("show");
    footerLogo.classList.add("hide");
    footerBlurb.classList.remove("show");
    footerBlurb.classList.add("hide");
    footerLinks.classList.remove("show");
    footerLinks.classList.add("hide");
    console.log("hide");
  }
}

// observer.observe(footer);
// els.forEach((element) => console.log(element));
els.forEach((element) => observer.observe(element));
btnObserver.observe(mainSection);
footerObserver.observe(footer);
