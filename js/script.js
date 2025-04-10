document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("lineup").style.display = "block";

    const lignes = [
      { nom: "Ligne 1", logo: "L1.png", dir1: "Campus Allan Turing", dir2: "Centre-ville", min1: 4, min2: 6 },
      { nom: "Ligne 2", logo: "L2.png", dir1: "Université", dir2: "Gare", min1: 8, min2: 7 },
      { nom: "Ligne 3", logo: "L3.png", dir1: "Nord", dir2: "Sud", min1: 10, min2: 10 },
      { nom: "Ligne 4", logo: "L4.png", dir1: "Est", dir2: "Ouest", min1: 12, min2: 11 },
    ];

    const container = document.getElementById("lineup");

    lignes.forEach(ligne => {
      const div = document.createElement("div");
      div.className = "ligne";
      div.innerHTML = `
        <img src="${ligne.logo}" alt="${ligne.nom}" class="logo-ligne" />
        <div class="infos-ligne">
          <p>Direction ${ligne.dir1} : ${ligne.min1} min <span class="sep">|</span> Bus suivant : ${ligne.min1 + 5} min</p>
          <p>Direction ${ligne.dir2} : ${ligne.min2} min <span class="sep">|</span> Bus suivant : ${ligne.min2 + 5} min</p>
        </div>
      `;
      container.appendChild(div);
    });
  }, 1500); // Simulation de chargement
});
