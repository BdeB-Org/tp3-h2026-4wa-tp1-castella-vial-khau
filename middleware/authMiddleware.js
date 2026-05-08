//-----gestion de connexion côté serveur
const jwt = require('jsonwebtoken');      //----librairie qui crée et vérifie les tokens

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {      //-----verifie si le token existe
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    const token = header.split(' ')[1];     //-----extrait le token

    try {
        const decoded = jwt.verify(token, 'secretkey');    //-----verifie la validité
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });    //----- affiche un message de refus
    }
};

//----- Sert à la connexion des utilisateurs
