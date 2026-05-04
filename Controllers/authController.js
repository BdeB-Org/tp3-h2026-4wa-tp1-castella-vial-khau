const db = require('../Config/database');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!user) {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe invalide' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                'secretkey',
                { expiresIn: '2h' }
            );

            res.json({
                message: 'Connexion réussie',
                token,
                username: user.username
            });
        }
    );
};
