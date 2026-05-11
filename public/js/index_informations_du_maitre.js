requireAuth();

//------Section Iléona informations du maitre -------------------------

const messageMaitre = document.getElementById('messageMaitre');
const formAjoutMaitre = document.getElementById('formAjoutMaitres');
const tbodyMaitres = document.getElementById('tbodyMaitres');

function showMessage(text, isError = false) {
    messageMaitre.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerMaitres() {
    try {
        const res = await apiFetch('/api/Maitres');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

        tbodyAnimaux.innerHTML = '';

        data.forEach(maitre => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${maitre.idMaitre}</td>
                <td>${escapeHtml(maitre.informationsAnimal)}</td>
                <td>${escapeHtml(maitre.prenom)}</td>
                <td>${escapeHtml(maitre.nomMaitre)}</td>
                <td>${escapeHtml(maitre.telephone)}</td>
                <td>${escapeHtml(maitre.courriel)}</td>
                <td>${escapeHtml(maitre.ageMaitre)}</td>
                <td>${escapeHtml(maitre.adresse)}</td>
                <td>${escapeHtml(maitre.ville)}</td>
                <td>
                    <a class="btn-link" href="/edit_maitre.html?id=${maitre.idMaitre}">Modifier</a>
                    <button class="danger" onclick="supprimerMaitre(${maitre.idMaitre})">Supprimer</button>
                </td>
            `;
            tbodyMaitres.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

formAjoutMaitre.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        informationsAnimal: document.getElementById('informationsAnimal').value.trim(),
        prenom: document.getElementById('prenom').value.trim(),
        nomMaitre: document.getElementById('nomMaitre').value.trim(),
        telephone: document.getElementById('telephone').value.trim(),
        courriel: document.getElementById('courriel').value.trim(),
        ageMaitre: document.getElementById('ageMaitre').value.trim(),
        adresse: document.getElementById('adresse').value.trim(),
        ville: document.getElementById('ville').value.trim(),
    };
//-------affiche un message si on soumet un formulaire vide : remplir les champs obligatoires------
        if (!payload.informationsAnimal || !payload.prenom || !payload.nomMaitre || 
        !payload.courriel) {
        showMessage('Veuillez remplir tous les champs obligatoires', true);
        return;
    }
//---------valide que age taille et poids sont des nombres----
        if (isNaN(payload.ageMaitre) || isNaN(payload.telephone)) {
        showMessage('L\'âge et le téléphone doivent être des nombres', true);
        return;
    }

    try {
        const res = await apiFetch('/api/Maitres', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        formAjoutMaitre.reset();
        showMessage('Propriétaire ajouté avec succès');
        chargerMaitres();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerMaitre(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce propriétaire ?')) return;

    try {
        const res = await apiFetch('/api/Maitres/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerMaitres();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerMaitres();
