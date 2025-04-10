document.addEventListener("DOMContentLoaded", () => {
  const lignes = [
    {
      nom: "Ligne 1",
      directions: [
        {
          nom: "Campus Allan Turing",
          horaires: { premier: "06h15", deuxieme: "06h30" }
        },
        {
          nom: "Centre-ville",
          horaires: { premier: "06h20", deuxieme: "06h35" }
        }
      ]
    },
    {
      nom: "Ligne 2",
      directions: [
        {
          nom: "Gare Centrale",
          horaires: { premier: "06h10", deuxieme: "06h25" }
        },
        {
          nom: "Parc Technologique",
          horaires: { premier: "06h18", deuxieme: "06h33" }
        }
      ]
    }
  ];

  const container = document.getElementById("horaires-container");

  lignes.forEach((ligne) => {
    const ligneDiv = document.createElement("div");
    ligneDiv.className = "ligne-block";

    const nomLigne = document.createElement("h2");
    nomLigne.textContent = ligne.nom;
    ligneDiv.appendChild(nomLigne);

    ligne.directions.forEach((dir) => {
      const dirDiv = document.createElement("div");
      dirDiv.className = "direction";
      dirDiv.textContent = `Direction ${dir.nom} :`;
      ligneDiv.appendChild(dirDiv);

      const horairesContainer = document.createElement("div");
      horairesContainer.className = "horaires";

      horairesContainer.innerHTML = `🔹 Prochains départs : `;

      const badge1 = document.createElement("span");
      badge1.className = "badge";
      badge1.textContent = dir.horaires.premier;

      const badge2 = document.createElement("span");
      badge2.className = "badge";
      badge2.textContent = dir.horaires.deuxieme;

      horairesContainer.appendChild(badge1);
      horairesContainer.appendChild(badge2);

      ligneDiv.appendChild(horairesContainer);
    });

    container.appendChild(ligneDiv);
  });
});
