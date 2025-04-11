document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    updateHoraires();
  }, 1000);
});

function updateHoraires() {
  const horaires = {
    ligne1: [16, 24],
    ligne2: [11, 16],
    ligne3: [16, 32],
    ligne4: [19, 28]
  };

  // Simule les minutes d'attente en temps réel
  function getDelays(freq) {
    const min = Math.floor(Math.random() * freq);
    const next = min + freq;
    return [min, next];
  }

  Object.keys(horaires).forEach(ligne => {
    const [min1, min2] = getDelays(horaires[ligne][0]);
    const [min3, min4] = getDelays(horaires[ligne][1]);

    document.getElementById(`${ligne}-dir1`).textContent = `${min1} min`;
    document.getElementById(`${ligne}-dir1-next`).textContent = `${min2} min`;

    document.getElementById(`${ligne}-dir2`).textContent = `${min3} min`;
    document.getElementById(`${ligne}-dir2-next`).textContent = `${min4} min`;
  });

  setTimeout(updateHoraires, 30000); // met à jour toutes les 30s
}
