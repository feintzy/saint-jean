// netlify/functions/chat.js
// Exemple de fonction serverless pour un chatbot simple.
// Pour un vrai chatbot IA, remplacez la logique de réponse par un appel à une API externe
// et configurez vos secrets via les variables d'environnement Netlify.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    body = {};
  }

  const message = (body.message || "").toLowerCase();

  let answer = null;

  if (message.includes("heure") && (message.includes("feu") || message.includes("grand feu"))) {
    answer = "Le grand feu est prévu le samedi vers 22h30 🔥 (sous réserve météo). Pense à venir un peu avant, l’ambiance monte vite 😉";
  } else if (message.includes("repas") || message.includes("manger") || message.includes("menu")) {
    answer = "On organise un repas convivial le samedi soir, sous chapiteau, juste avant le grand feu 😋 Les infos et réservations seront sur la page Programme.";
  } else if (message.includes("prix") || message.includes("gratuit")) {
    answer = "La plupart des animations extérieures sont gratuites. Certaines activités et le repas seront payants. Les détails arrivent bientôt sur le site.";
  } else if (message.includes("venir") || message.includes("où") || message.includes("lieu")) {
    answer = "La fête se passe à Enghien, entre le parc et le centre-ville. Si tu vois un grand feu et des gens qui s’amusent, tu es au bon endroit 🔥😉";
  } else if (message.includes("bénévole") || message.includes("aider") || message.includes("coup de main")) {
    answer = "Tu peux t’inscrire comme bénévole via la page Bénévoles ou en nous envoyant un message depuis la page Contact. Merci pour ton aide 😍";
  } else if (message.includes("sponsor") || message.includes("partenaire") || message.includes("soutenir")) {
    answer = "Va voir la page Sponsors pour les formules et le dossier sponsor, ou contacte-nous directement. Merci pour ton soutien 🙌";
  }

  if (!answer) {
    const fallback = [
      "Je suis juste un petit bot de Saint-Jean, mais j’ai une grande flamme dans le cœur 🔥 Tu peux consulter les différentes pages du site pour plus de détails 😄",
      "Ouh, bonne question ! Si je ne réponds pas bien, essaie de regarder dans le menu en haut ou envoie un message via la page Contact 😊",
      "Je ne suis pas encore assez intelligent pour ça… mais je sais dire : viens à la fête de la Saint-Jean, tu ne le regretteras pas 😎🔥",
    ];
    answer = fallback[Math.floor(Math.random() * fallback.length)];
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ answer }),
  };
};
