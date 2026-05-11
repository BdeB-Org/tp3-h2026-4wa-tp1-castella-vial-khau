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
        const res = await apiFetch('/api/Maitres/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('informationsAnimal').value = data.informationsAnimal;
        document.getElementById('prenom').value = data.prenom;
        document.getElementById('nomMaitre').value = data.nomMaitre;
        document.getElementById('telephone').value = data.telephone;
        document.getElementById('courriel').value = data.courriel;
        document.getElementById('ageMaitre').value = data.ageMaitre;
        document.getElementById('adresse').value = data.adresse;
        document.getElementById('ville').value = data.ville;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
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
//-------valider les champs obligatoires-----
        if (!payload.informationsAnimal || !payload.prenom || !payload.nomMaitre || 
        !payload.courriel) {
        showMessage('Veuillez remplir tous les champs obligatoires', true);
        return;
    }

    //------poids age et taille en nombre-----
        if (isNaN(payload.ageMaitre) || isNaN(payload.telephone)) {
        showMessage('L\'âge et le téléphone doivent être des nombres', true);
        return;
    }

    try {
        const res = await apiFetch('/api/Maitres/' + id, {
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