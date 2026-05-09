requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerAnimal() {
    try {
        const res = await apiFetch('/api/Animal/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('informationsMaitre').value = data.informationsMaitre;
        document.getElementById('noCollier').value = data.noCollier;
        document.getElementById('nom').value = data.nom;
        document.getElementById('type').value = data.type;
        document.getElementById('race').value = data.race;
        document.getElementById('genre').value = data.genre;
        document.getElementById('age').value = data.age;
        document.getElementById('taille').value = data.taille;
        document.getElementById('poids').value = data.poids;
        document.getElementById('infoMedicales').value = data.infoMedicales;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
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
//-------valider les champs obligatoires-----
        if (!payload.informationsMaitre || !payload.noCollier || !payload.nom || 
        !payload.type || !payload.race || !payload.genre || 
        !payload.age || !payload.taille || !payload.poids) {
        showMessage('Veuillez remplir tous les champs obligatoires', true);
        return;
    }

    //------poids age et taille en nombre-----
        if (isNaN(payload.age) || isNaN(payload.taille) || isNaN(payload.poids)) {
        showMessage('L\'âge, la taille et le poids doivent être des nombres', true);
        return;
    }

    try {
        const res = await apiFetch('/api/Animal/' + id, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/liste_informations_de_lanimal.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID animal manquant', true);
} else {
    chargerAnimal();
}