document.addEventListener("DOMContentLoaded", function () {
  chargerParcours("15jours"); // Chargez les parcours de 15 jours par défaut
});

document.getElementById("btn15").addEventListener("click", function () {
  chargerParcours("15jours");
});

document.getElementById("btn20").addEventListener("click", function () {
  chargerParcours("20jours");
});

document.getElementById("btn25").addEventListener("click", function () {
  chargerParcours("25jours");
});

function showLoading() {
  document.getElementById("fauxChargement").style.display = "block";
}

function hideLoading() {
  document.getElementById("fauxChargement").style.display = "none";
}

function chargerParcours(duree) {
  fetch(
    "https://raw.githubusercontent.com/Clemom/Site_Bali/main/Parcours_Shiva_15/Parcours_Shiva.json"
  )
    .then((response) => response.json())
    .then((data) => {
      let filteredParcours;
      if (duree === "25jours") {
        // Inclut les parcours de 15, 20 et 25 jours
        filteredParcours = data.parcours.filter(
          (p) =>
            p.duree === "15jours" ||
            p.duree === "20jours" ||
            p.duree === "25jours"
        );
      } else if (duree === "20jours") {
        // Inclut les parcours de 15 et 20 jours
        filteredParcours = data.parcours.filter(
          (p) => p.duree === "15jours" || p.duree === "20jours"
        );
      } else {
        // Seulement les parcours de 15 jours
        filteredParcours = data.parcours.filter((p) => p.duree === "15jours");
      }
      affichageParcours(filteredParcours);
    })
    .catch((error) =>{
      console.error("Erreur lors du chargement des parcours:", error);
      hideLoading();
});
}

function affichageParcours(parcours) {
  const container = document.getElementById("parcoursContainer");
  container.innerHTML = "";
  parcours.forEach((lieu) => {
    const parcoursElem = document.createElement("div");
    parcoursElem.className = "container-parcours1";

    const introElem = document.createElement("div");
    introElem.className = "container-intro";
    introElem.innerHTML = `<h1>${lieu.titre}</h1><p>Jours: ${lieu.jours}</p>`;

    const carteDecouvrirContainer = document.createElement("div");
    carteDecouvrirContainer.className = "container-carte-decouvrir";

    lieu.activites.forEach((act) => {
      const carteParcours = document.createElement("div");
      carteParcours.className = "carte-parcours";
      carteParcours.innerHTML = `
                <img class="carte-image" src="${act.image}" alt="${act.jour}">
                <div class="carte-contenu">
                    <h4>${act.jour}</h4>
                    <div class="carte-infos">
                        <p>${act.description}</p>
                    </div>
                </div>
            `;
      carteDecouvrirContainer.appendChild(carteParcours);
    });

    parcoursElem.appendChild(introElem);
    parcoursElem.appendChild(carteDecouvrirContainer);

    const boutonPlus = document.createElement("div");
    boutonPlus.className = "bouton-plus";
    boutonPlus.innerHTML = `<a href="#">En savoir plus</a>`;

    parcoursElem.appendChild(boutonPlus);
    container.appendChild(parcoursElem);
  });
  // Ajouter l'animation
  setTimeout(() => {
    container.classList.add("visible");
  }, 10);
  setTimeout(() => {
    container.classList.remove("visible");
  }, 5555100); // La durée de la transition plus le temps que tu veux que le contenu reste visible
}
