requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerMaitre() {
    try {
        const res = await apiFetch('/api/Maitre/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('prenom').value = data.Prenom;
        document.getElementById('nomMaitre').value = data.Nom;
        document.getElementById('telephone').value = data.NoTelephone;
        document.getElementById('courriel').value = data.Courriel;
        document.getElementById('ageMaitre').value = data.Age;
        document.getElementById('adresse').value = data.Adresse;
        document.getElementById('ville').value = data.Ville;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        Prenom: document.getElementById('prenom').value.trim(),
        Nom: document.getElementById('nomMaitre').value.trim(),
        NoTelephone: document.getElementById('telephone').value.trim(),
        Courriel: document.getElementById('courriel').value.trim(),
        Age: document.getElementById('ageMaitre').value.trim(),
        Adresse: document.getElementById('adresse').value.trim(),
        Ville: document.getElementById('ville').value.trim(),
    };
//-------valider les champs obligatoires-----
        if (!payload.Prenom || !payload.Nom || !payload.Courriel) {
        showMessage('Veuillez remplir les champs prénom, nom et courriel', true);
        return;
    }

    //------âge et téléphone en nombre-----
        if (isNaN(payload.Age) || isNaN(payload.NoTelephone)) {
        showMessage('L\'âge et le téléphone doivent être des nombres', true);
        return;
    }

    try {
        const res = await apiFetch('/api/Maitre/' + id, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/liste_informations_du_maitre.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID propriétaire manquant', true);
} else {
    chargerMaitre();
}