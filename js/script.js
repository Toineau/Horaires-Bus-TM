document.addEventListener('DOMContentLoaded', () => {
  const lignes = {
    ligne1: { nom: "Gare Centrale <> Campus Alan Turing", img: "L1.png", frequence: 16 },
    ligne2: { nom: "Gare Centrale <> Aéroport", img: "L2.png", frequence: 11 },
    ligne3: { nom: "Gare Centrale <> Campus Marthe Gautier", img: "L3.png", frequence: 16 },
    ligne4: { nom: "Gare Centrale <> Gare de l’Est", img: "L4.png", frequence: 19 },
  };

  const getNextTimes = (freq) => {
    const now = new Date();
    const min = now.getMinutes();
    const next = freq - (min % freq);
    const second = next + freq;
    return [next, second];
  };

  for (const id in lignes) {
    const ligne = lignes[id];
    const container = document.getElementById(id);

    const [next1, next2] = getNextTimes(ligne.frequence);

    container.innerHTML = `
      <img src="img/${ligne.img}" alt="${ligne.nom}">
      <h2>${ligne.nom}</h2>
      <div class="direction">
        → Direction 1 : ${next1} min | ${next2} min
      </div>
      <div class="direction">
        → Direction 2 : ${next1} min | ${next2} min
      </div>
    `;
  }

  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 1500);
});
