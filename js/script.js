document.addEventListener("DOMContentLoaded", () => {
  const horaires = {
    1: { nom: "Campus Alan Turing", image: "L1.png", freq: { semaine: 16, samedi: 24, dimanche: 48 } },
    2: { nom: "Aéroport", image: "L2.png", freq: { semaine: 11, samedi: 13, dimanche: 20 } },
    3: { nom: "Campus Marthe Gautier", image: "L3.png", freq: { semaine: 16, samedi: 21, dimanche: 32 } },
    4: { nom: "Gare de l'Est", image: "L4.png", freq: { semaine: 19, samedi: 28, dimanche: 20 } },
  };

  const today = new Date();
  const hour = today.getHours();
  const day = today.getDay();

  function getFrequence(line) {
    if (day === 0) return horaires[line].freq.dimanche;
    if (day === 6) return horaires[line].freq.samedi;
    return horaires[line].freq.semaine;
  }

  function generateBadge(line) {
    const freq = getFrequence(line);
    const prochain = freq;
    const suivant = freq * 2;

    return `
      <div class="line-badge">
        <div class="line-title">
          <img src="${horaires[line].image}" alt="Ligne ${line}">
          <strong>Ligne ${line} - ${horaires[line].nom}</strong>
        </div>
        <div class="next-bus">
          <span>Direction → ${horaires[line].nom} : ${prochain} min</span>
          <span>|</span>
          <span>Suivant : ${suivant} min</span>
        </div>
        <div class="next-bus">
          <span>Direction → Gare Centrale : ${prochain} min</span>
          <span>|</span>
          <span>Suivant : ${suivant} min</span>
        </div>
      </div>`;
  }

  // Simule chargement
  setTimeout(() => {
    const content = document.getElementById("content");
    const loader = document.getElementById("loader");
    loader.style.display = "none";
    content.style.display = "block";

    content.innerHTML = Object.keys(horaires).map(generateBadge).join("");
  }, 1500);
});
