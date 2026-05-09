requireAuth();

const form = document.getElementById("formEdit");
const message = document.getElementById("message");
const params = new URLSearchParams(window.location.search);
const idAvis = params.get("idAvis");

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerAvis() {
    try {
        const res = await apiFetch('/api/avis/' + idAvis);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('idAnimal').value = data.idAnimal;
        document.getElementById('typeSignalement').value = data.typeSignalement;
        document.getElementById('date').value = data.date;
        document.getElementById('photo').value = data.photo;
        document.getElementById('description').value = data.description;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idAnimal = document.getElementById('idAnimal').value.trim();
    const typeSignalement = document.getElementById('typeSignalement').value.trim();
    const date = document.getElementById('date').value.trim();
    const photo = document.getElementById('photo').value.trim();
    const description = document.getElementById('description').value.trim();

    try {
        const res = await apiFetch('/api/avis/' + idAvis, {
            method: 'PUT',
            body: JSON.stringify({ idAnimal, typeSignalement, date, photo, description })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeAvis.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!idAvis) {
    showMessage('ID avis manquant', true);
} else {
    chargerAvis();
}
