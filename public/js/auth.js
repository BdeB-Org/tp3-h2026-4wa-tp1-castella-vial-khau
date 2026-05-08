//-----gestion de connexion côté front-end (navigateur)
function saveToken(token) {     //----fonction qui sauvegarde le token
    localStorage.setItem('token', token);
}

function getToken() {     //----récupère le token sauvegardé
    return localStorage.getItem('token');
}

function logout() {      //-----supprimme le token lorsque l'utilisateur se déconnecte
    localStorage.removeItem('token');
    window.location.href = '/login.html';   //-----redirection vers la page de login
}

function requireAuth() {     //----- vérifie si le token existe (pas s'il est valide, ça c'est le authMiddleware qui le fait)
    const token = getToken();
    if (!token) {
        window.location.href = '/login.html';
    }
}

async function apiFetch(url, options = {}) {     //-----asynch = fonction qui peut attendre des opérations lentes, mais qui permet au reste du site de fonctionner en attendant
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401 || response.status === 403) {   //-----401> pas connecté    403> token invalide
        logout();
        throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    return response;
}
