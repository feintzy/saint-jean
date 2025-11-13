// assets/js/main.js
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Nav mobile
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });
}

// Theme toggle (light/dark) - could be extended with more styles
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const stored = localStorage.getItem("theme");
  if (stored === "dark") document.body.classList.add("theme-dark");

  const updateIcon = () => {
    themeToggle.textContent = document.body.classList.contains("theme-dark")
      ? "☀️"
      : "🌙";
  };
  updateIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("theme-dark") ? "dark" : "light"
    );
    updateIcon();
  });
}
