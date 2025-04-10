document.addEventListener("DOMContentLoaded", () => {
  const horaires = {
    1: { label: "Campus Alan Turing", freq: [24, 16, null, 24, 24, 48, null, 48] },
    2: { label: "Aéroport", freq: [16, 11, 40, 20, 13, 40, 40, 20] },
    3: { label: "Campus Marthe Gautier", freq: [32, 16, 64, 32, 21, 64, 64, 32] },
    4: { label: "Gare de l’Est", freq: [28, 19, null, null, 28, null, null, null] },
  };

  const now = new Date();
  const day = now.getDay(); // 0=dimanche, 6=samedi
  const hour = now.getHours();
  let type;

  if (day === 0) {
    type = hour >= 19 ? 7 : 6;
  } else if (day === 6) {
    if (hour >= 19) type = 5;
    else if (hour >= 7 && hour <= 10 || hour >= 16 && hour <= 19) type = 4;
    else type = 3;
  } else {
    if (hour >= 19) type = 2;
    else if (hour >= 7 && hour <= 10 || hour >= 16 && hour <= 19) type = 1;
    else type = 0;
  }

  function formatMinutes(minutes) {
    return minutes !== null ? `${minutes} min` : "Fin de service";
  }

  Object.entries(horaires).forEach(([id, ligne]) => {
    const freq = ligne.freq[type];
    const suivant = freq !== null ? new Date(now.getTime() + freq * 60000) : null;
    const suivant2 = freq !== null ? new Date(now.getTime() + freq * 2 * 60000) : null;

    const html = `
      <h2>Ligne ${id} - Gare Centrale ⇄ ${ligne.label}</h2>
      <div class="bus-info">
        <span>Direction ${ligne.label} : ${suivant ? `${formatMinutes(freq)} → ${suivant.getHours()}h${String(suivant.getMinutes()).padStart(2, "0")}` : "Fin de service"}</span>
        <span class="separator">|</span>
        <span>Bus suivant : ${suivant2 ? `${suivant2.getHours()}h${String(suivant2.getMinutes()).padStart(2, "0")}` : "Fin de service"}</span>
      </div>
    `;
    document.getElementById(`ligne${id}`).innerHTML = html;
  });

  document.getElementById("loader").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
});
