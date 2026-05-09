requireAuth();

const message = document.getElementById("message");
const tbody = document.getElementById("tbodyAvis");

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

async function chargerAvis() {
    try {
        const res = await apiFetch('/api/avis');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(avis => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${avis.idAvis}</td>
                <td>${escapeHtml(avis.idAnimal)}</td>
                <td>${escapeHtml(avis.typeSignalement)}</td>
                <td>${escapeHtml(avis.date)}</td>
                <td>${escapeHtml(avis.photo)}</td>
                <td>${escapeHtml(avis.description)}</td>
                <td>
                    <a class="btn-link" href="/editAvis.html?id=${avis.idAvis}">Modifier</a>
                    <button class="danger" onclick="supprimerAvis(${avis.idAvis})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } 
    catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerAvis(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet avis ?')) return;

    try {
        const res = await apiFetch('/api/avis' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerAvis();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerAvis();