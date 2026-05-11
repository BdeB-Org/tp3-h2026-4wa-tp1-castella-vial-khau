//----------- liste information du propriétaire - Iléona ----------

requireAuth();

const tbodyMaitres = document.getElementById('tbodyMaitres');
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

        const res = await apiFetch('/api/Maitre');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

        tbodyMaitres.innerHTML = '';
        if (data.length === 0) {
            tbodyMaitres.innerHTML = '<tr><td colspan="11">Aucun propriétaire trouvé</td></tr>';
            return;
        }

        //---- Récupère les données de la table et les affiche dans le tableau ----
        data.forEach(maitre => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${escapeHtml(maitre.Id_maitre)}</td>
                <td>${escapeHtml(maitre.Prenom)}</td>
                <td>${escapeHtml(maitre.Nom)}</td>
                <td>${escapeHtml(maitre.NoTelephone)}</td>
                <td>${escapeHtml(maitre.Courriel)}</td>
                <td>${escapeHtml(maitre.Age)}</td>
                <td>${escapeHtml(maitre.Adresse)}</td>
                <td>${escapeHtml(maitre.Ville)}</td>
                <td>
                    <a class="btn-link" href="/edit_informations_du_maitre.html?id=${maitre.Id_maitre}">Modifier</a>
                    <button class="danger" onclick="supprimerMaitre(${maitre.Id_maitre})">Supprimer</button>
                </td>
            `;
            tbodyMaitres.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerMaitre(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce propriétaire ?')) return;

    try {
        const res = await apiFetch('/api/Maitre/' + id, {
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