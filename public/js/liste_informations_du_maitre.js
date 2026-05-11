//----------- liste information du propriétaire - Iléona ----------

requireAuth();

const tbody = document.getElementById('tbodyMaitres');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

//----- évite les caractères spéciaux -----
function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerMaitres() {   //----- appelle l'API ------
    try {

        const res = await apiFetch('/api/Maitres'); //-- Le S --
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

        tbody.innerHTML = '';
        if (data.length === 0) {
            tbodyMaitres.innerHTML = '<tr><td colspan="11">Aucun propriétaire trouvé</td></tr>';
            return;
        }

        //---- Récupère les données de la table et les affiche dans le tableau ----
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
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerMaitre(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce propriétaire ?')) return;

    try {
        const res = await apiFetch('/api/maitres/' + id, { //-- Le S--
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur lors de la suppression');

        showMessage('Propriétaire supprimé avec succès');
        chargerMaitres();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerMaitres();