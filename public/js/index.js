requireAuth();

//------Section Sandra informations de l'animal-------------------------

const messageAnimal = document.getElementById('messageAnimal');
const formAjoutAnimal = document.getElementById('formAjoutAnimal');
const tbodyAnimaux = document.getElementById('tbodyAnimaux');

function showMessageAnimal(text, isError = false) {
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
        showMessageAnimal(err.message, true);
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

    //-------champs obligatoires : ID propriétaire, nom et type------
    if (!payload.informationsMaitre || !payload.nom || !payload.type) {
        showMessageAnimal('L\'ID du propriétaire, le nom et le type de l\'animal sont obligatoires', true);
        return;
    }

    //------age taille et poids doivent être des nombres s'ils sont remplis----
    if (payload.age && isNaN(payload.age)) {
        showMessageAnimal('L\'âge doit être un nombre', true);
        return;
    }
    if (payload.taille && isNaN(payload.taille)) {
        showMessageAnimal('La taille doit être un nombre', true);
        return;
    }
    if (payload.poids && isNaN(payload.poids)) {
        showMessageAnimal('Le poids doit être un nombre', true);
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
        showMessageAnimal('Animal ajouté avec succès');
        chargerAnimaux();
    } catch (err) {
        showMessageAnimal(err.message, true);
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

        showMessageAnimal(data.message);
        chargerAnimaux();
    } catch (err) {
        showMessageAnimal(err.message, true);
    }
}

chargerAnimaux();
