let pumpkinScene = document.querySelector(".pumpkin-scene");
let summerScene = document.querySelector(".summer-scene");
console.log(pumpkinScene);

pumpkinScene.style.opacity = 0;
// summerScene.style.opacity = 0;

function letterDrop() {
  let captionText = document.querySelector(".caption-h1").textContent;
  document.querySelector(".caption-h1").innerHTML = "";
  console.log(captionText.length);
  console.log(captionText);
  for (let i = 0; i < captionText.length; i++) {
    setTimeout(() => {
      let spanLetter = document.createElement("span");
      spanLetter.className = "drop-letter";
      console.log("fired", i);
      if (captionText[i] == " ") {
        console.log("empty space!!");
        spanLetter.innerHTML = String.fromCharCode(32);
      } else {
        //   let spanLetter = document.createElement("span");
        spanLetter.innerHTML = `<h3>${captionText[i]}</h3>`;
      }
      console.log("fired", i);
      document.querySelector(".caption-h1").append(spanLetter);
      if (i == captionText.length - 1) {
        setTimeout(() => vanishLetters(), 1500);
      }
    }, i * 200);
  }
}

letterDrop();

function vanishLetters() {
  console.log("vanisLetters fired!");
  let dropLetters = document.querySelectorAll(".drop-letter");
  for (let i = 0; i < dropLetters.length; i++) {
    setTimeout(() => {
      dropLetters[i].classList.add("vanish");
      console.log("fired", i);
      if (i == dropLetters.length - 1) {
        setTimeout(() => {
          document.querySelector(".summer-scene").style.opacity = 0;
          setTimeout(() => {
            pumpkinScene.style.opacity = 1;
            setTimeout(() => {
              document.querySelector(".delay").style.transform = "scale(1)";
            }, 1500);
          }, 1000);
        }, 3500);
      }
    }, i * 200);
  }
}
