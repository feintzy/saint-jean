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

// --- Contact forms -> Cloudflare Worker (Resend) ---
document.querySelectorAll("form.contact-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // empêche le refresh

    const endpoint = form.dataset.endpoint;
    const msg = form.querySelector(".formMsg");

    if (!endpoint) {
      if (msg) msg.textContent = "Configuration manquante : endpoint non défini.";
      return;
    }

    const payload = Object.fromEntries(new FormData(form));
    payload.type = form.dataset.type || "general";

    if (msg) msg.textContent = "Envoi en cours…";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        form.reset();
        if (msg) msg.textContent = "Merci ! Votre message a bien été envoyé.";
      } else {
        const t = await res.text().catch(() => "");
        console.error("[contact] server error:", t);
        if (msg) msg.textContent = "Oups, erreur côté serveur. Réessayez plus tard.";
      }
    } catch (err) {
      console.error("[contact] fetch failed:", err);
      if (msg) msg.textContent = "Erreur réseau. Réessayez plus tard.";
    }
  });
});
