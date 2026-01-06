window.__SJ_MAIN_LOADED__ = true;
console.log("[SJ] main.js loaded", location.href);

const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const mobile = document.getElementById("mobileNav");
if (burger && mobile) burger.addEventListener("click", () => mobile.classList.toggle("open"));

const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  const stored = localStorage.getItem("theme");
  if (stored === "dark") document.body.classList.add("theme-dark");
  const paint = () => themeBtn.textContent = document.body.classList.contains("theme-dark") ? "☀️" : "🌙";
  paint();
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    localStorage.setItem("theme", document.body.classList.contains("theme-dark") ? "dark" : "light");
    paint();
  });
}
