let inputUploadDiv = document.querySelector(".input-upload-div");

inputUploadDiv.ondragenter = (e) => {
  inputUploadDiv.classList.add("darken-input");
  console.log("dragEnter");
};

inputUploadDiv.ondragover = (e) => {
  console.log("dragOver");
};

inputUploadDiv.ondragleave = (e) => {
  console.log("dragLeave");
  inputUploadDiv.classList.remove("darken-input");
};

inputUploadDiv.ondrop = (e) => {
  inputUploadDiv.classList.remove("darken-input");

  console.log("dragDROP!");
};
