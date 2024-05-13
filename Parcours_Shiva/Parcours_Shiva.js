document.querySelector(".retour a").addEventListener("click" , function (event){
  event.preventDefault();
  retourPage();
});

document.addEventListener("DOMContentLoaded", function () {
    chargerParcours("15jours");
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
  
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(){
      document.querySelectorAll("button").forEach(b => b.classList.remove("active-button"));
      button.classList.add("active-button");
    })
  })

  function retourPage(){
    history.back();
  }
  
  function chargerParcours(duree) {
    let jsonParcours;

    if (duree === "25jours"){
        jsonParcours ="https://raw.githubusercontent.com/Clemom/Site_Bali/main/Parcours_Shiva/Parcours_Shiva25.json";
    } else if (duree ==="20jours"){
        jsonParcours="https://raw.githubusercontent.com/Clemom/Site_Bali/main/Parcours_Shiva/Parcours_Shiva20.json";
    } else {
        jsonParcours="https://raw.githubusercontent.com/Clemom/Site_Bali/main/Parcours_Shiva/Parcours_Shiva15.json"
    }

    fetch(jsonParcours)
      .then((response) => response.json())
      .then((data) => {
        let filtreParcours;
        if (duree === "25jours") {
          filtreParcours = data.parcours.filter(
            (parcours) => parcours.duree === "15jours" || parcours.duree === "20jours" || parcours.duree === "25jours"
          );
        } else if (duree === "20jours") {
          filtreParcours = data.parcours.filter(
            (parcours) => parcours.duree === "15jours" || parcours.duree === "20jours"
          );
        } else {
          filtreParcours = data.parcours.filter((parcours) => parcours.duree === "15jours");
        }
        affichageParcours(filtreParcours);
      })
      .catch((error) =>{
        console.error("Erreur lors du chargement des parcours:", error);
        hideLoading();
  });
  }
  
  function affichageParcours(parcours) {
    const container = document.getElementById("parcoursContainer");

    container.classList.remove("visible");
    container.classList.add("hidden");
    setTimeout(() =>{
    container.innerHTML = "";
    parcours.forEach((lieu) => {
      const parcoursElement = document.createElement("div");
      parcoursElement.className = "container-parcours1";
  
      const introElement = document.createElement("div");
      introElement.className = "container-intro";
      introElement.innerHTML = `<h1>${lieu.titre}</h1><p>${lieu.jours}</p>`;
  
      const carteDecouvrirContainer = document.createElement("div");
      carteDecouvrirContainer.className = "container-carte-decouvrir";
  
      lieu.activites.forEach((activites) => {
        const carteParcours = document.createElement("div");
        carteParcours.className = "carte-parcours";
        carteParcours.innerHTML = `
                  <img class="carte-image" src="${activites.image}" alt="${activites.jour}">
                  <div class="carte-contenu">
                      <h4>${activites.jour}</h4>
                      <div class="carte-infos">
                          <p>${activites.description}</p>
                      </div>
                  </div>
              `;
        carteDecouvrirContainer.appendChild(carteParcours);
      });
  
      parcoursElement.appendChild(introElement);
      parcoursElement.appendChild(carteDecouvrirContainer);
  
      const boutonPlus = document.createElement("div");
      boutonPlus.className = "bouton-plus";
      boutonPlus.innerHTML = `<a href="#">En savoir plus</a>`;
  
      parcoursElement.appendChild(boutonPlus);
      container.appendChild(parcoursElement);
    });
      container.classList.remove("hidden");
      container.classList.add("visible");
    }, 200);
  }
  