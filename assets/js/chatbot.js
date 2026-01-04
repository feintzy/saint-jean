class SaintBot{
  constructor(rootId){
    this.root=document.getElementById(rootId);
    if(!this.root) return;
    this.render(); this.bind();
    this.bot("Salut ! Je suis Saint‑Bot 🤖🔥. Pose-moi une question sur le programme, le lieu, ou comment aider.");
  }
  render(){
    this.root.innerHTML=`
      <button class="chatToggle" aria-label="Ouvrir le chatbot">💬</button>
      <div class="chatPanel" role="dialog" aria-label="Chatbot Saint-Jean">
        <div class="chatHead">
          <div>
            <div class="chatTitle">Saint‑Bot 🤖🔥</div>
            <div class="chatSub">Site en construction — infos susceptibles d’évoluer</div>
          </div>
          <button class="chatClose" aria-label="Fermer">✕</button>
        </div>
        <div class="chatMsgs"></div>
        <form class="chatForm">
          <input class="chatInput" placeholder="Ex: À quelle heure est le feu ?" autocomplete="off" />
          <button class="chatSend" type="submit">Envoyer</button>
        </form>
      </div>`;
    this.toggle=this.root.querySelector(".chatToggle");
    this.panel=this.root.querySelector(".chatPanel");
    this.closeBtn=this.root.querySelector(".chatClose");
    this.msgs=this.root.querySelector(".chatMsgs");
    this.form=this.root.querySelector(".chatForm");
    this.input=this.root.querySelector(".chatInput");
  }
  bind(){
    this.toggle.addEventListener("click",()=>{this.panel.classList.add("open");this.toggle.classList.add("hidden");this.input.focus();});
    this.closeBtn.addEventListener("click",()=>{this.panel.classList.remove("open");this.toggle.classList.remove("hidden");});
    this.form.addEventListener("submit",(e)=>{
      e.preventDefault();
      const v=this.input.value.trim(); if(!v) return;
      this.user(v); this.input.value=""; this.reply(v);
    });
  }
  add(t,cls){const d=document.createElement("div"); d.className=`bubble ${cls}`; d.innerHTML=t; this.msgs.appendChild(d); this.msgs.scrollTop=this.msgs.scrollHeight;}
  bot(t){this.add(t,"bot")}
  user(t){this.add(t,"user")}
  reply(message){
    const msg=message.toLowerCase();
    let ans=null;
    if(msg.includes("lieu")||msg.includes("où")||msg.includes("vieux marché")){
      ans="Le site principal est sur la <b>Place du Vieux Marché</b> à Enghien. Les feux se font au parc (vendredi soir).";
    } else if(msg.includes("vendredi")){
      ans="Vendredi 26/06/2026 : <b>18h</b> ouverture + remise des clés + repas • <b>22h</b> cortège vers le parc • <b>22h30</b> mise à feu du bûcher • <b>23h</b> soirée (fermeture 1h30).";
    } else if(msg.includes("samedi")){
      ans="Samedi 27/06/2026 : <b>10h</b> activités • <b>12h</b> foodtrucks • <b>15h</b> baptême du Géant Titje • <b>16h</b> cortège • <b>18h30</b> concerts • <b>23h30</b> soirée (fermeture 1h30).";
    } else if(msg.includes("dimanche")||msg.includes("procession")){
      ans="Dimanche 28/06/2026 : procession + <b>12h</b> remise des clés à la fin de la procession.";
    } else if(msg.includes("feu")||msg.includes("bûcher")||msg.includes("bucher")){
      ans="Le bûcher est mis à feu <b>vendredi à 22h30</b> 🔥 (départ en cortège vers le parc à 22h).";
    } else if(msg.includes("bénévole")||msg.includes("benevole")||msg.includes("aider")){
      ans="Merci 🙌 ! Pour aider (bénévoles), passe par la page <b>Contact</b> pour l’instant — on reliera un formulaire dédié bientôt.";
    }
    if(!ans){
      const f=[
        "Le programme complet est sur la page <b>Programme</b> 😉",
        "Le site est en construction : certaines infos peuvent évoluer, mais l’ambiance sera sûre 🔥",
        "Je suis un bot… donc parfois je réponds avec des étincelles 😄"
      ];
      ans=f[Math.floor(Math.random()*f.length)];
    }
    setTimeout(()=>this.bot(ans),420);
  }
}
document.addEventListener("DOMContentLoaded",()=>new SaintBot("chatbotRoot"));
