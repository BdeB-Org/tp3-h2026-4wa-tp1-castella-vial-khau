requireAuth();

//------Section Iléona informations du maitre -------------------------

const messageMaitre = document.getElementById('messageMaitre');
const formAjoutMaitre = document.getElementById('formAjoutMaitre');
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
        const res = await apiFetch('/api/Maitre');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

        tbodyMaitres.innerHTML = '';

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

formAjoutMaitre.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        informationsAnimal: document.getElementById('informationsAnimal').value.trim(),
        Prenom: document.getElementById('prenom').value.trim(),
        Nom: document.getElementById('nomMaitre').value.trim(),
        NoTelephone: document.getElementById('telephone').value.trim(),
        Courriel: document.getElementById('courriel').value.trim(),
        Age: document.getElementById('ageMaitre').value.trim(),
        Adresse: document.getElementById('adresse').value.trim(),
        Ville: document.getElementById('ville').value.trim(),
    };
//-------affiche un message si on soumet un formulaire vide : remplir les champs obligatoires------
        if (!payload.informationsAnimal || !payload.Prenom || !payload.Nom || !payload.Courriel) {
        showMessage('Veuillez remplir les champs ID de l\'animal, prénom, nom et courriel', true);
        return;
    }
//---------valide que l'âge et le téléphone sont des nombres----
        if ((payload.Age && isNaN(payload.Age)) || (payload.NoTelephone && isNaN(payload.NoTelephone))) {
        showMessage('L\'âge et le téléphone doivent être des nombres', true);
        return;
    }

    try {
        const res = await apiFetch('/api/Maitre', {
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
        const res = await apiFetch('/api/Maitre/' + id, {
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
