const horaires = {
  "1": { premier: 6, dernier: 22 },
  "2": { premier: 5.5, dernier: 23 },
  "3": { premier: 6.25, dernier: 21.75 },
  "4": { premier: 6, dernier: 20.5 }
};

function getCurrentPeriod() {
  const now = new Date();
  const h = now.getHours();
  const d = now.getDay();
  if (d === 0) return 'dimanche';
  if (d === 6) return 'samedi';
  if ((h >= 7 && h < 9) || (h >= 17 && h < 19)) return 'pointes';
  if (h >= 21 || h < 23) return 'soiree';
  if (h >= 23 || h < 6) return '';
  return 'creuses';
}

function getFrequency(line, period, isWeekend) {
  const data = {
    "1": { "creuses": 24, "pointes": 16, "soiree": null, "": null, "samedi": { creuses: 24, pointes: 24, soiree: 48 }, "dimanche": { creuses: null, pointes: 48 } },
    "2": { "creuses": 16, "pointes": 11, "soiree": 40, "": null, "samedi": { creuses: 20, pointes: 13, soiree: 40 }, "dimanche": { creuses: 40, pointes: 20 } },
    "3": { "creuses": 32, "pointes": 16, "soiree": 64, "": null, "samedi": { creuses: 32, pointes: 21, soiree: 64 }, "dimanche": { creuses: 64, pointes: 32 } },
    "4": { "creuses": 28, "pointes": 19, "soiree": null, "": null, "samedi": { creuses: null, pointes: 28, soiree: null }, "dimanche": { creuses: null, pointes: null } }
  };
  if (isWeekend) return data[line][isWeekend][period] ?? null;
  return data[line][period];
}

function getNextBusTime(interval, line) {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const { premier, dernier } = horaires[line];

  if (hour < premier || hour > dernier) {
    const premierH = Math.floor(premier);
    const premierM = Math.round((premier % 1) * 60);
    return `Fin de service. Premier bus à ${premierH}h${premierM.toString().padStart(1, '0')}`;
  }

  if (!interval) return "Pas de service actuellement";
  const start = new Date();
  start.setHours(premier, 0, 0, 0);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const minutesStart = premier * 60;
  const sinceStart = minutesNow - minutesStart;
  const nextIn = interval - (sinceStart % interval);
  return `Prochain bus dans ${nextIn} min`;
}

function checkPerturbation(callback) {
  fetch("https://seal.transport-manager.net/Toineau/traffic-et-perturbations/")
    .then(res => res.text())
    .then(html => {
      const isPerturbed = html.includes("Trafic légèrement perturbé");
      callback(isPerturbed);
    })
    .catch(() => callback(false));
}

function updateAll() {
  const period = getCurrentPeriod();
  const now = new Date();
  const day = now.getDay();
  const weekend = (day === 0) ? "dimanche" : (day === 6) ? "samedi" : null;

  checkPerturbation(isPerturbed => {
    for (let i = 1; i <= 4; i++) {
      const freq = getFrequency(i.toString(), period, weekend);
      let text = getNextBusTime(freq, i.toString());
      if (isPerturbed) text = "Perturbations en cours - retards possibles. " + text;
      const el = document.getElementById(`next${i}`);
      if (el) el.innerText = text + ` (${period}${weekend ? ' - ' + weekend : ''})`;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateAll();
  setInterval(updateAll, 60000);
});
