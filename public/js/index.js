requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyEtudiants');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerEtudiants() {
    try {
        const res = await apiFetch('/api/etudiants');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(etudiant => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${etudiant.id}</td>
                <td>${escapeHtml(etudiant.nom)}</td>
                <td>${escapeHtml(etudiant.programme)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${etudiant.id}">Modifier</a>
                    <button class="danger" onclick="supprimerEtudiant(${etudiant.id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const programme = document.getElementById('programme').value.trim();

    try {
        const res = await apiFetch('/api/etudiants', {
            method: 'POST',
            body: JSON.stringify({ nom, programme })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Étudiant ajouté avec succès');
        chargerEtudiants();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerEtudiant(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return;

    try {
        const res = await apiFetch('/api/etudiants/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerEtudiants();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerEtudiants();




//------Section Sandra informations de l'animal------je mets ca ici pour le moment parce que j'ai peur de tout casser----

const formAjoutAnimal = document.getElementById('formAjoutAnimal');
const tbodyAnimaux = document.getElementById('tbodyAnimaux');


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
        infoMedicales: document.getElementById('infoMedicales').value.trim()
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
