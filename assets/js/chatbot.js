// assets/js/chatbot.js

class SaintJeanChatbot {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    if (!this.root) return;

    this.isOpen = false;
    this.initUI();
  }

  initUI() {
    this.root.innerHTML = `
      <button class="chatbot-toggle" aria-label="Ouvrir le chatbot">
        💬
      </button>
      <div class="chatbot-panel">
        <div class="chatbot-header">
          <div>
            <div class="chatbot-title">Saint-Bot 🤖🔥</div>
            <div class="chatbot-subtitle">Pose-moi une question sur la fête !</div>
          </div>
          <button class="chatbot-close" aria-label="Fermer le chatbot">✕</button>
        </div>
        <div class="chatbot-messages"></div>
        <form class="chatbot-form">
          <input
            type="text"
            class="chatbot-input"
            placeholder="Ex : À quelle heure est le grand feu ?"
            autocomplete="off"
          />
          <button type="submit" class="chatbot-send">Envoyer</button>
        </form>
      </div>
    `;

    this.toggleBtn = this.root.querySelector(".chatbot-toggle");
    this.panel = this.root.querySelector(".chatbot-panel");
    this.messagesEl = this.root.querySelector(".chatbot-messages");
    this.form = this.root.querySelector(".chatbot-form");
    this.input = this.root.querySelector(".chatbot-input");
    this.closeBtn = this.root.querySelector(".chatbot-close");

    this.toggleBtn.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    this.addBotMessage(
      "Salut ! Je suis Saint-Bot, le chatbot le plus enflammé d’Enghien 🔥<br>Pose-moi tes questions sur la fête de la Saint-Jean !"
    );
  }

  open() {
    this.panel.classList.add("open");
    this.toggleBtn.classList.add("hidden");
    this.isOpen = true;
    this.input.focus();
  }

  close() {
    this.panel.classList.remove("open");
    this.toggleBtn.classList.remove("hidden");
    this.isOpen = false;
  }

  addMessage(text, from = "bot") {
    const bubble = document.createElement("div");
    bubble.className = `chatbot-bubble chatbot-bubble-${from}`;
    bubble.innerHTML = text;
    this.messagesEl.appendChild(bubble);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  addBotMessage(text) {
    this.addMessage(text, "bot");
  }

  addUserMessage(text) {
    this.addMessage(text, "user");
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.input.value.trim();
    if (!value) return;
    this.addUserMessage(value);
    this.input.value = "";
    this.reply(value);
  }

  reply(message) {
    const msg = message.toLowerCase();

    let answer = null;

    if (msg.includes("heure") && (msg.includes("feu") || msg.includes("grand feu"))) {
      answer = "Le grand feu est prévu le <strong>samedi vers 22h30</strong> 🔥 (sous réserve météo). Pense à venir un peu avant, l’ambiance monte vite 😉";
    } else if (msg.includes("repas") || msg.includes("manger") || msg.includes("menu")) {
      answer = "On organise un <strong>repas convivial</strong> le samedi soir, sous chapiteau, juste avant le grand feu 😋 Les infos et réservations seront sur la page Programme.";
    } else if (msg.includes("prix") || msg.includes("gratuit")) {
      answer = "Bonne question ! La plupart des animations extérieures sont <strong>gratuites</strong>. Certaines activités et le repas seront payants. Les détails arrivent bientôt sur le site.";
    } else if (msg.includes("venir") || msg.includes("où") || msg.includes("lieu")) {
      answer = "La fête se passe à <strong>Enghien</strong>, entre le <strong>parc</strong> et le <strong>centre-ville</strong>. Si tu vois un grand feu et des gens qui s’amusent, tu es au bon endroit 🔥😉";
    } else if (msg.includes("bénévole") || msg.includes("aider") || msg.includes("coup de main")) {
      answer = "On adore les gens qui posent cette question 😍 Tu peux t’inscrire comme bénévole via la page <strong>Bénévoles</strong> ou en nous envoyant un message depuis la page Contact.";
    } else if (msg.includes("sponsor") || msg.includes("partenaire") || msg.includes("soutenir")) {
      answer = "Merci pour ton intérêt 🙌 Va voir la page <strong>Sponsors</strong> pour les formules et le dossier sponsor, ou contacte-nous directement !";
    }

    if (!answer) {
      const fallback = [
        "Je suis juste un petit bot de Saint-Jean, mais j’ai une grande flamme dans le cœur 🔥 Tu peux consulter les différentes pages du site pour plus de détails 😄",
        "Ouh, bonne question ! Si je ne réponds pas bien, essaie de regarder dans le menu en haut ou envoie un message via la page Contact 😊",
        "Je ne suis pas encore assez intelligent pour ça… mais je sais dire : <strong>viens à la fête de la Saint-Jean, tu ne le regretteras pas</strong> 😎🔥",
      ];
      answer = fallback[Math.floor(Math.random() * fallback.length)];
    }

    setTimeout(() => this.addBotMessage(answer), 450);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SaintJeanChatbot("chatbot-root");
});
