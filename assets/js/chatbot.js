class SaintBot {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    if (!this.root) return;
    this.render();
    this.bind();
    this.bot(
      "Salut ! Je suis <b>Saint-Bot</b> 🤖🔥. Le site est en construction : le programme est <b>en cours d’élaboration</b>. " +
      "Pose-moi une question (lieu, bénévoles, sponsors, feu, procession…)."
    );
  }

  render() {
    this.root.innerHTML = `
      <button class="chatToggle" aria-label="Ouvrir le chatbot">💬</button>
      <div class="chatPanel" role="dialog" aria-label="Chatbot Saint-Jean">
        <div class="chatHead">
          <div>
            <div class="chatTitle">Saint-Bot 🤖🔥</div>
            <div class="chatSub">Programme en cours d’élaboration • infos à jour bientôt</div>
          </div>
          <button class="chatClose" aria-label="Fermer">✕</button>
        </div>
        <div class="chatMsgs"></div>
        <form class="chatForm">
          <input class="chatInput" placeholder="Ex: Où ça se passe ? / Comment devenir bénévole ?" autocomplete="off" />
          <button class="chatSend" type="submit">Envoyer</button>
        </form>
      </div>
    `;
    this.toggle = this.root.querySelector(".chatToggle");
    this.panel = this.root.querySelector(".chatPanel");
    this.closeBtn = this.root.querySelector(".chatClose");
    this.msgs = this.root.querySelector(".chatMsgs");
    this.form = this.root.querySelector(".chatForm");
    this.input = this.root.querySelector(".chatInput");
  }

  bind() {
    this.toggle.addEventListener("click", () => {
      this.panel.classList.add("open");
      this.toggle.classList.add("hidden");
      this.input.focus();
    });

    this.closeBtn.addEventListener("click", () => {
      this.panel.classList.remove("open");
      this.toggle.classList.remove("hidden");
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = this.input.value.trim();
      if (!v) return;
      this.user(this.escapeHtml(v));
      this.input.value = "";
      this.reply(v);
    });
  }

  escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  add(html, cls) {
    const div = document.createElement("div");
    div.className = `bubble ${cls}`;
    div.innerHTML = html;
    this.msgs.appendChild(div);
    this.msgs.scrollTop = this.msgs.scrollHeight;
  }

  bot(html) { this.add(html, "bot"); }
  user(html) { this.add(html, "user"); }

  link(label, href) {
    return `<a href="${href}" style="color:inherit; text-decoration:underline; font-weight:700">${label}</a>`;
  }

  reply(message) {
    const msg = message.toLowerCase();
    const programLink = this.link("Programme", "./programme.html");
    const infosLink = this.link("Infos", "./infos.html");
    const contactLink = this.link("Contact", "./contact.html");
    const benevolesLink = this.link("Bénévoles", "./benevoles.html");
    const sponsorsLink = this.link("Sponsors", "./sponsors.html");

    let ans = null;

    // Lieu
    if (msg.includes("où") || msg.includes("ou") || msg.includes("lieu") || msg.includes("adresse") || msg.includes("vieux marché")) {
      ans =
        "Le point central est la <b>Place du Vieux Marché</b> à Enghien. " +
        "Certaines activités (ex: feu) sont prévues autour du parc, détails à confirmer. " +
        `➡️ ${infosLink}`;
    }

    // Programme / horaires
    else if (msg.includes("programme") || msg.includes("horaire") || msg.includes("quand") || msg.includes("date")) {
      ans =
        "Le programme détaillé est <b>en cours d’élaboration</b>. " +
        "On préfère publier une version fiable dès qu’elle est validée. " +
        `➡️ ${programLink} (et si tu veux aider: ${benevolesLink} 😉)`;
    }

    // Feu / bûcher
    else if (msg.includes("feu") || msg.includes("bûcher") || msg.includes("bucher")) {
      ans =
        "Oui, le <b>grand feu de la Saint-Jean</b> fait partie des intentions fortes 🔥. " +
        "Les modalités (heure, cortège, sécurité) sont en construction avec l’équipe et les autorités. " +
        `➡️ ${programLink}`;
    }

    // Procession / cortège / folklore
    else if (msg.includes("procession") || msg.includes("cortège") || msg.includes("cortege") || msg.includes("folklore") || msg.includes("géant") || msg.includes("geant")) {
      ans =
        "On travaille sur des moments <b>folklore</b> (cortège, animations, etc.). " +
        "Plutôt que d’annoncer trop tôt, on publie quand c’est validé. " +
        `➡️ ${programLink} • ${contactLink}`;
    }

    // Bénévoles
    else if (msg.includes("bénévole") || msg.includes("benevole") || msg.includes("aider") || msg.includes("donner un coup de main")) {
      ans =
        "On adore les gens qui disent ça ❤️ (et promis, on a aussi du café). " +
        `➡️ Va sur ${benevolesLink} ou écris via ${contactLink} (sujet “Bénévolat”).`;
    }

    // Sponsors
    else if (msg.includes("sponsor") || msg.includes("parten") || msg.includes("mécène") || msg.includes("mecene")) {
      ans =
        "Merci 🙌 Les sponsors aident à rendre la fête possible. " +
        `➡️ ${sponsorsLink} ou ${contactLink} (sujet “Sponsor / partenariat”).`;
    }

    // Repas / restauration
    else if (msg.includes("repas") || msg.includes("manger") || msg.includes("food") || msg.includes("boire") || msg.includes("bar")) {
      ans =
        "On prévoit des options de <b>restauration</b> (formules/stands/boissons), mais les détails arrivent bientôt. " +
        `➡️ ${programLink} • et pour une question précise: ${contactLink} (sujet “Repas”).`;
    }

    // Réseaux sociaux
    else if (msg.includes("facebook") || msg.includes("instagram") || msg.includes("tiktok") || msg.includes("réseau") || msg.includes("reseau")) {
      ans =
        "Les liens réseaux sociaux sont en place en bas de page (footer). " +
        "Dès que les comptes officiels sont finalisés, on mettra les vrais liens (promis, pas des #). 😉";
    }

    // Contact
    else if (msg.includes("contact") || msg.includes("email") || msg.includes("mail") || msg.includes("message")) {
      ans =
        `➡️ Tu peux nous écrire via ${contactLink}. ` +
        "Choisis le sujet (Programme, Bénévolat, Sponsors, Repas, Presse…) et ça arrive directement dans la bonne boîte mail.";
    }

    // Presse
    else if (msg.includes("presse") || msg.includes("journal") || msg.includes("media") || msg.includes("média")) {
      ans =
        `Pour la presse : passe par ${contactLink} avec le sujet <b>Presse</b>. ` +
        "On te répondra dès que possible avec les infos validées.";
    }

    // Fallback fun
    if (!ans) {
      const fallbacks = [
        `Je suis un bot, mais je promets de ne pas brûler le programme 🔥😄 ➡️ ${programLink}`,
        `Bonne question ! Le site évolue. Si c’est important, écris via ${contactLink} 😉`,
        `J’ai cherché dans mes circuits… et le programme est encore en cuisine 🍳 ➡️ ${programLink}`,
        `Je peux te dire un secret : Enghien + folklore = combo gagnant. Le reste arrive bientôt 😎`,
      ];
      ans = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    setTimeout(() => this.bot(ans), 420);
  }
}

document.addEventListener("DOMContentLoaded", () => new SaintBot("chatbotRoot"));
