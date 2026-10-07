const langBtn = document.getElementById("langBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

let currentLang = localStorage.getItem("lioz-lang") || "fr";

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-fr][data-en]").forEach(el => {
    el.innerHTML = el.dataset[lang];
  });

  document.querySelectorAll("[data-placeholder-fr][data-placeholder-en]").forEach(el => {
    el.placeholder = el.dataset[`placeholder${lang === "fr" ? "Fr" : "En"}`];
  });

  langBtn.textContent = lang === "fr" ? "EN" : "FR";
  localStorage.setItem("lioz-lang", lang);
}

langBtn.addEventListener("click", () => {
  applyLanguage(currentLang === "fr" ? "en" : "fr");
});

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
applyLanguage(currentLang);
