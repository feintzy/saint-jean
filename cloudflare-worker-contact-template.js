export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    const body = await request.json();
    const type = (body.type || "general").toLowerCase();
    const MAP = {
      general: "contact@saint-jean.org",
      benevole: "benevoles@saint-jean.org",
      sponsor: "sponsors@saint-jean.org",
    };
    const toEmail = MAP[type] || MAP.general;
    const message = {
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: "no-reply@saint-jean.org", name: "Site Saint-Jean Enghien" },
      subject: `📩 Nouveau message (${type}) de ${body.nom || "Visiteur"}`,
      content: [{
        type: "text/plain",
        value: `Type : ${type}
Nom : ${body.nom}
Email : ${body.email}
Sujet : ${body.sujet}
Téléphone : ${body.telephone || ""}
Message :
${body.message || body.taches || body.interet || ""}`
      }]
    };
    const resp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!resp.ok) return new Response("Erreur d’envoi", { status: 500 });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
};
