//-----------liste information de l'animal --- Sandra ----------

requireAuth();

const tbody = document.getElementById('tbodyAnimaux');
const messageAnimal = document.getElementById('messageAnimal');

function showMessageAnimal(text, isError = false) {
    messageAnimal.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
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

async function chargerAnimaux() {   //-----appelle l'API pour récupérer les données des animaux------
    try {
        const res = await apiFetch('/api/Animal');  
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

        tbody.innerHTML = '';

        //--------------si aucune donnée dispo----
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="11">Aucun animal trouvé</td></tr>';
            return;
        }

        data.forEach(animal => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${animal.idAnimal}</td>
                <td>${escapeHtml(String(animal.informationsMaitre))}</td>
                <td>${escapeHtml(animal.nom)}</td>
                <td>${escapeHtml(String(animal.noCollier))}</td>
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
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessageAnimal(err.message, true);
    }
}

async function supprimerAnimal(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet animal ?')) return;

    try {
        const res = await apiFetch('/api/Animal/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur lors de la suppression');

        showMessageAnimal('Animal supprimé avec succès');
        chargerAnimaux(); //--------------------mise à jour de la liste
    } catch (err) {
        showMessageAnimal(err.message, true);
    }
}

chargerAnimaux();