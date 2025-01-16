let uploadCaptionDefault = document.querySelector(".upload-caption-default");
let uploadCaptionError = document.querySelector(".upload-caption-error");

let signUpSection = document.querySelector(".sign-up-section");
let userTicketSection = document.querySelector(".user-ticket-section");

document.querySelector("form").onsubmit = (e) => handleFormSubmit(e);

let userFile;
let wrongCounter = 0;
let input_errors = {
  fullname: false,
  email: false,
  github: false,
};

function handleFormSubmit(e) {
  e.preventDefault();
  if (wrongCounter == 1 && !userFile) {
    userFile = "./assets/images/image-avatar.jpg";
  }
  console.log("handleSubmit!");
  formData = new FormData(document.querySelector(".user-form"));
  let userData = {
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    github: formData.get("github"),
  };

  let isError = false;
  for (let property in userData) {
    if (userData[property] == "") {
      renderInputError(property);
      isError = true;
    }
  }
  if (userFile == undefined) {
    isError = true;
    renderFileUploadError();
    wrongCounter++;
  }

  if (!isError) {
    handleSuccess(userData);
  }
}

function renderFileUploadError() {
  document.querySelector(".input-upload-div").classList.add("error-border");
  uploadCaptionDefault.classList.add("blur-caption");
  uploadCaptionError.classList.remove("blur-caption");
}

function renderInputError(field) {
  document.getElementById(`${field}-error`).classList.add("show-error");
  document.getElementById(field).classList.add("error-border");
}

function handleSuccess(userData) {
  signUpSection.classList.add("hide-page-view");
  userTicketSection.classList.add("show-user-ticket-view");

  document.getElementById("username-display").innerHTML = userData.fullname;
  document.getElementById("email-display").innerHTML = userData.email;
  document.getElementById("ticket-github").innerHTML = userData.github;
  document.getElementById("ticket-username").innerHTML = userData.fullname;
  document.getElementById("ticket-img").src = userFile
    ? URL.createObjectURL(userFile)
    : "./assets/images/image-avatar.jpg";
  document
    .getElementById("github-link")
    .setAttribute("href", `https://github.com/${userData.github}`);
}

fileInput = document.querySelector("input[type='file']");

fileInput.oninput = (e) => {
  console.log("upload photo!!", e.target.files[0]);
  userFile = e.target.files[0];

  let newImg = new Image();
  newImg.className = "upload-img-thumbnail";
  newImg.src = URL.createObjectURL(e.target.files[0]);
  document.querySelector(
    ".upload-icon-div"
  ).innerHTML = `<img class='upload-img-thumbnail' src='${URL.createObjectURL(
    e.target.files[0]
  )}' alt='img'/>`;
};

document.querySelectorAll("input[type='text']").forEach((input) => {
  input.onkeydown = (e) => {
    if (e.target.classList.contains("error-border")) {
      e.target
        .closest(".form-div")
        .querySelector(".input-error-caption")
        .classList.remove("show-error");
      e.target.classList.remove("error-border");

      setTimeout(() => {
        e.target
          .closest(".form-div")
          .querySelector(".input-error-caption")
          .classList.remove("show-error");
      }, 1000);
    }
  };
});

document.querySelector("input[type='file']").onchange = (e) => {
  document.querySelector(".input-upload-div").classList.remove("error-border");
  uploadCaptionDefault.classList.remove("blur-caption");
  uploadCaptionError.classList.add("blur-caption");
};
