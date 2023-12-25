const accardion__title = document.querySelectorAll(".accardion__title");

const openAccardion = (e) => {
  for(let i of accardion__title) {
    i.parentNode.classList.remove("active");
  }
  e.target.parentNode.classList.add("active");
  e.target.style.color = "red";
};

for(let a of accardion__title) {
  a.addEventListener("click", openAccardion);
}