// Year
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

// Theme toggle
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

// Multi contact forms (for future worker endpoint)
const forms = document.querySelectorAll(".contact-form");
forms.forEach((form) => {
  form.addEventListener("submit", async (e) => {
    const endpoint = form.dataset.endpoint;
    if (!endpoint) return;
    e.preventDefault();
    const type = form.dataset.type || "general";
    const msgEl = form.querySelector(".formMsg");
    const data = Object.fromEntries(new FormData(form));
    data.type = type;
    if (msgEl) msgEl.textContent = "Envoi en cours…";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        if (msgEl) msgEl.textContent = "Merci ! Votre message a bien été envoyé.";
      } else {
        if (msgEl) msgEl.textContent = "Oups, une erreur est survenue. Merci de réessayer.";
      }
    } catch (err) {
      if (msgEl) msgEl.textContent = "Erreur réseau. Merci de réessayer plus tard.";
    }
  });
});
