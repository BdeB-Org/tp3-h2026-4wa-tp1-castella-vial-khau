//Fait par Brandon Khau
const db = require("../Config/database");

// Controller Get
exports.getAvis = (req,res) => {
    db.all("SELECT * FROM Avis ORDER BY idAvis DESC",[], (err,rows)=> {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// Controller Get
exports.getAvisByID = (req,res) => {
    db.get("SELECT * FROM Avis WHERE idAvis = ?",
        [req.params.idAvis],
        (err, row) => {
            if (err) return res.status(500).json({ message: err.message });
            if (!row) return res.status(404).json({ message: 'Avis non trouvé' });
            res.json(row);
        }
    );
};

// Controller Post
exports.addAvis = (req,res) => {
    const {idAnimal,typeSignalement, date, photo, description} = req.body;

    db.run(
        "INSERT INTO Avis (idAnimal, typeSignalement, date, photo, description) VALUES (?, ?, ?, ?, ?)",
        [idAnimal, typeSignalement, date, photo, description],
        function(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }

            res.json({
                message:"Avis ajouté!",
                id:this.lastID
            });
        }
    );
};

// Controller Update
exports.updateAvis = (req,res) => {
    const idAvis = req.params.idAvis;
    const {idAnimal, typeSignalement, date, photo, description} = req.body;

    db.run(
        "UPDATE Avis SET idAnimal = ?, typeSignalement = ?, date = ?, photo = ?, description = ? WHERE idAvis = ?",
        [idAnimal, typeSignalement, date, photo, description, idAvis],
        function(err) {
            if(err) {
                return res.status(500).json({erreur: err.message});
            }
            if (this.changes === 0) return res.status(404).json({ message: 'Avis non trouvé' });

            res.json({
                message:"Avis modifié",
                idAvis:idAvis
            });
        }
    );
};

// Controller Delete
exports.deleteAvis = (req,res) => {
    db.run(
        "DELETE FROM Avis WHERE idAvis = ?",
        [req.params.idAvis],
        function(err){
            if (err) {
            console.error(err);
            return res.status(500).json({erreur: err.message});
            }
        
            if (this.changes === 0) {
                return res.status(404).json({message: "Aucun avis trouvé avec cet ID"})
            }

            res.json({message: "Avis supprimé"});
        }
    );
};