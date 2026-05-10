requireAuth();

//------Section Sandra informations de l'animal-------------------------

const messageAnimal = document.getElementById('messageAnimal');
const formAjoutAnimal = document.getElementById('formAjoutAnimal');
const tbodyAnimaux = document.getElementById('tbodyAnimaux');

function showMessage(text, isError = false) {
    messageAnimal.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerAnimaux() {
    try {
        const res = await apiFetch('/api/Animal');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

        tbodyAnimaux.innerHTML = '';

        data.forEach(animal => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${animal.idAnimal}</td>
                <td>${escapeHtml(animal.informationsMaitre)}</td>
                <td>${escapeHtml(animal.nom)}</td>
                <td>${escapeHtml(animal.noCollier)}</td>
                <td>${escapeHtml(animal.type)}</td>
                <td>${escapeHtml(animal.race)}</td>
                <td>${escapeHtml(animal.genre)}</td>
                <td>${animal.age}</td>
                <td>${animal.taille} cm</td>
                <td>${animal.poids} kg</td>
                <td>
                    <a class="btn-link" href="/edit_informations_de_lanimal.html?id=${animal.idAnimal}">Modifier</a>
                    <button class="danger" onclick="supprimerAnimal(${animal.idAnimal})">Supprimer</button>
                </td>
            `;
            tbodyAnimaux.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

formAjoutAnimal.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        informationsMaitre: document.getElementById('informationsMaitre').value.trim(),
        noCollier: document.getElementById('noCollier').value.trim(),
        nom: document.getElementById('nom').value.trim(),
        type: document.getElementById('type').value.trim(),
        race: document.getElementById('race').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        age: document.getElementById('age').value.trim(),
        taille: document.getElementById('taille').value.trim(),
        poids: document.getElementById('poids').value.trim(),
    };
//-------affiche un message si on soumet un formulaire vide : remplir les champs obligatoires------
        if (!payload.informationsMaitre || !payload.noCollier || !payload.nom || 
        !payload.type || !payload.race || !payload.genre || 
        !payload.age || !payload.taille || !payload.poids) {
        showMessage('Veuillez remplir tous les champs obligatoires', true);
        return;
    }
//---------valide que age taille et poids sont des nombres----
        if (isNaN(payload.age) || isNaN(payload.taille) || isNaN(payload.poids)) {
        showMessage('L\'âge, la taille et le poids doivent être des nombres', true);
        return;
    }

    try {
        const res = await apiFetch('/api/Animal', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        formAjoutAnimal.reset();
        showMessage('Animal ajouté avec succès');
        chargerAnimaux();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerAnimal(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet animal ?')) return;

    try {
        const res = await apiFetch('/api/Animal/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerAnimaux();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerAnimaux();
