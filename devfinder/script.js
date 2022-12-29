window.onload = () => {
  console.log("domContent loaded");
  let preferedTheme = localStorage.getItem("preferred-theme") || "";
  if (preferedTheme) {
    document.querySelector(".app").setAttribute("data-theme", preferedTheme);
    if (preferedTheme == "dark") {
      document
        .querySelector(".theme-icon")
        .setAttribute("src", "./assets/icon-sun.svg");
      document.querySelector(".theme-h5").innerHTML = "Light";
      document.querySelector(".theme-h5").classList.add("white");

      document.querySelector(".app").setAttribute("data-theme", "dark");
    } else {
      document
        .querySelector(".theme-icon")
        .setAttribute("src", "./assets/icon-moon.svg");
      document.querySelector(".theme-h5").innerHTML = "Dark";
      document.querySelector(".theme-h5").classList.remove("white");
      document.querySelector(".app").setAttribute("data-theme", "light");
    }
  }

  fetchData();
};

var months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function fetchData(username = "greenie62") {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message) {
        console.log("user not found");
        toggleError("No results");
        return;
      }

      document
        .querySelectorAll(".link-item")
        .forEach((el) => el.classList.remove("mute"));
      document.querySelector(".username").innerHTML = res.login;
      document.querySelector(".avatar").setAttribute("src", res.avatar_url);
      document.querySelector(".email").innerHTML = `@${res.login}`;
      document.querySelector(".bio").innerHTML = `${res.bio}`;
      document.querySelector(".join").innerHTML = `Joined ${new Date(
        res.created_at
      ).getDay()} ${months[new Date(res.created_at).getMonth() - 1]}  ${
        res.created_at.split("-")[0]
      }`;
      document.querySelector("#repos").innerHTML = `${res.public_repos}`;
      document.querySelector("#followers").innerHTML = `${res.followers}`;
      document.querySelector("#following").innerHTML = `${res.following}`;
      document.querySelector("#city").innerHTML = res.location
        ? `${res.location}`
        : "Not available";
      if (!res.location) document.querySelector("#city").classList.add("mute");
      document.querySelector("#twitter").innerHTML = res.twitter_username
        ? `${res.twitter_username}`
        : "Not available";
      if (!res.twitter_username)
        document.querySelector("#twitter").classList.add("mute");
      document.querySelector("#website").innerHTML = res.blog
        ? `${res.blog}`
        : "Not available";
      if (!res.blog) document.querySelector("#website").classList.add("mute");

      document.querySelector(".org").innerHTML = res.company
        ? `${res.company}`
        : "Not available";
      if (!res.company) document.querySelector("#.org").classList.add("mute");
    });
}

document.querySelector(".search-btn").onclick = (e) => {
  let username = document.querySelector("input[name='search-input']").value;
  fetchData(username);

  document.querySelector("input[name='search-input']").innerHTML = "";
};

document.querySelector(".toggle-div").onclick = (e) => {
  let currTheme = document.querySelector(".app").getAttribute("data-theme");
  console.log(currTheme);
  if (currTheme == "light") {
    document
      .querySelector(".theme-icon")
      .setAttribute("src", "./assets/icon-sun.svg");
    document.querySelector(".theme-h5").innerHTML = "Light";
    document.querySelector(".theme-h5").classList.add("white");

    document.querySelector(".app").setAttribute("data-theme", "dark");
  } else {
    document
      .querySelector(".theme-icon")
      .setAttribute("src", "./assets/icon-moon.svg");
    document.querySelector(".theme-h5").innerHTML = "Dark";
    document.querySelector(".theme-h5").classList.remove("white");
    document.querySelector(".app").setAttribute("data-theme", "light");
  }
  localStorage.setItem(
    "preferred-theme",
    currTheme == "light" ? "dark" : "light"
  );
};

function toggleError(msg) {
  console.log("toggleError", msg);
  document.querySelector(".error").innerHTML = msg;
  setTimeout(() => (document.querySelector(".error").innerHTML = ""), 1750);
}
