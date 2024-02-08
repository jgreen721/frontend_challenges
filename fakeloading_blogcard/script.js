let onlineStatus = localStorage.getItem("online-status") || "";
let hasRendered = false;
function renderData() {
  if (onlineStatus == "off") {
    document.querySelector(".signal-btn").classList.add("offline");
    return;
  }
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      if (i == 2) renderHero();
      if (i == 1) renderPublish();
      if (i == 2) renderDate();
      if (i == 3) renderTitle();
      if (i == 3) renderBlurb();
      if (i == 4) renderAvatar();
    }, i * 1000);
  }
  hasRendered = true;
}

renderData();

function renderHero() {
  document.querySelector("[data-hero]").innerHTML = "";
  document.querySelector("[data-hero]").innerHTML =
    "<img class='hero-img' src='./assets/images/illustration-article.svg' alt='hero-img'>";
}

function renderTitle() {
  document.querySelector("[data-title]").innerHTML = "";
  document.querySelector("[data-title]").innerHTML =
    "<h1 class='title-h1 fadein bold'>HTML & CSS foundations</h1>";
}

function renderPublish() {
  document.querySelector("[data-label]").innerHTML = "";
  document.querySelector("[data-label]").innerHTML =
    "<h3 class='label-h3 fadein'>Learning</h3>";
}

function renderBlurb() {
  document.querySelector("[data-blurb]").innerHTML = "";
  document.querySelector("[data-blurb]").innerHTML =
    "<p class='blurb'>These languages are the backbone of every website, defining structure, content, and presentation.</p>";
}

function renderDate() {
  document.querySelector("[data-day]").innerHTML = "";
  document.querySelector("[data-month]").innerHTML = "";
  document.querySelector("[data-year]").innerHTML = "";

  document.querySelector("[data-day]").innerHTML = "<h5 class='thin'>21</h5>";
  document.querySelector("[data-month]").innerHTML =
    "<h5 class='thin'>Dec</h5>";
  document.querySelector("[data-year]").innerHTML =
    "<h5 class='thin'>2023</h5>";
}

function renderAvatar() {
  document.querySelector("[data-img]").innerHTML = "";
  document.querySelector("[data-username]").innerHTML = "";
  ("<p class='blurb'>These languages are the backbone of every website, defining structure, content, and presentation.</p>");
  document.querySelector("[data-img]").innerHTML =
    "<img class='avatar-img' src='./assets/images/image-avatar.webp' alt='avatar'/>";
  document.querySelector("[data-username]").innerHTML =
    "<h5 class='bold fadein'>Greg Hooper </h5>";
}

function toggleSignal() {
  console.log("toggleSignal");
  document.querySelector(".signal-btn").classList.toggle("offline");
  if (document.querySelector(".signal-btn").classList.contains("offline")) {
    localStorage.setItem("online-status", "off");
  } else {
    localStorage.setItem("online-status", "on");
    onlineStatus = "on";
    if (!hasRendered) renderData();
  }
}
