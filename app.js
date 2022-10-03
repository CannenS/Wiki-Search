const form = document.querySelector(".search-form");
const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const deleteBtn = document.querySelector(".search-delete");
const hideBtn = document.querySelector(".hide");
const value = input.value;
const footer = document.querySelector(".footer");
const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";
const results = document.querySelector(".results");
const socialLinks = [...document.querySelectorAll(".social-link")];
const linkIcon = document.querySelector(".link-icon");

console.log(socialLinks);

// fetch data

const fetchWiki = async (searchValue) => {
  const response = await fetch(`${url}${searchValue}`);
  const data = await response.json();
  const info = data.query.search;
  const list = info
    .map((item) => {
      const { title, pageid, snippet } = item;
      return `<div class="card">
          <a href="http://en.wikipedia.org/?curid=${pageid}" target="__blank"><h1>${title}</h1>
          <p>
            ${snippet}
          </p></a>
        </div>`;
    })
    .join("");
  results.innerHTML = list;
};

// handle form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  fetchWiki(value);
  input.value = "";
});

// search bar

input.addEventListener("keyup", () => {
  const value = input.value;
  if (value.length > 0) {
    deleteBtn.classList.remove("hidden");
    form.classList.add("search-form-active");
  }
  if (value.length === 0) {
    deleteBtn.classList.add("hidden");
    form.classList.remove("search-form-active");
  }
});

deleteBtn.addEventListener("click", () => {
  input.value = "";
  deleteBtn.classList.add("hidden");
  form.classList.remove("search-form-active");
});

window.onscroll = function () {
  if (
    window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight &&
    !footer.classList.contains("footer-hide")
  ) {
    footer.classList.add("hidden");
  } else {
    footer.classList.remove("hidden");
  }
};

hideBtn.addEventListener("click", (e) => {
  e.preventDefault();
  footer.classList.add("footer-hide");
  hideBtn.classList.add("hidden");
  linkIcon.classList.remove("hidden");
  socialLinks.forEach((link) => {
    link.classList.add("hidden");
  });
});

linkIcon.addEventListener("click", (e) => {
  e.preventDefault();
  footer.classList.remove("footer-hide");
  hideBtn.classList.remove("hidden");
  linkIcon.classList.add("hidden");
  socialLinks.forEach((link) => {
    link.classList.remove("hidden");
  });
});
