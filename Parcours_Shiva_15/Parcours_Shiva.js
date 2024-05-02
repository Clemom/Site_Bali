document.getElementById('btn15').addEventListener('click', function() {
    loadParcours('15jours');
  });
  
  document.getElementById('btn25').addEventListener('click', function() {
    loadParcours('25jours');
  });
  
  function loadParcours(duration) {
    fetch('https://raw.githubusercontent.com/Clemom/Site_Bali/main/Parcours_Shiva_15/Parcours_Shiva.json')
      .then(response => response.json())
      .then(data => {
        const parcours = data.parcours.filter(p => p.duree === duration);
        displayParcours(parcours);
      })
      .catch(error => console.error('Erreur lors du chargement des parcours:', error));
  }
  
  function displayParcours(parcours) {
    const container = document.getElementById('parcoursContainer');
    container.innerHTML = ''; // Nettoyer les parcours précédents
    parcours.forEach(lieu => {
      const lieuElem = document.createElement('div');
      lieuElem.className = 'lieu';
      lieuElem.innerHTML = `
        <h1>${lieu.titre}</h1>
        <p>Jours: ${lieu.jours}</p>
        ${lieu.activites.map(act => `
          <div class="activite">
            <img src="${act.image}" alt="${act.jour}">
            <p>${act.jour}</p>
            <p>${act.description}</p>
          </div>
        `).join('')}
      `;
      container.appendChild(lieuElem);
    });
    // Ajouter l'animation
    setTimeout(() => { container.classList.add('visible'); }, 10);
    setTimeout(() => { container.classList.remove('visible'); }, 5100); // La durée de la transition plus le temps que tu veux que le contenu reste visible
  }
  