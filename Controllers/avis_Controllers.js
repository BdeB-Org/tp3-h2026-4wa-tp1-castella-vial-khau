const db = require("../Config/database");

// Controller Get
exports.getAvis = (req,res) => {
    db.all("SELECT * FROM Avis",(err,rows)=> {
        res.json(rows);
    });
};

// Controller Post
exports.addAvis = (req,res) => {
    const idAnimal = req.body.idAnimal;
    const typeSignalement = req.body.typeSignalement;
    const date = req.body.date;
    const photo = req.body.photo;
    const description = req.body.description;

    console.log ("Insertion:", idAnimal, typeSignalement, date, photo, description) ;

    db.run(
        "INSERT INTO Avis(Id_animal, Type_Signalement, Date, Photo, Description) VALUES (?,?)",
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
    const id = req.params.idAvis;
    const {idAnimal, typeSignalement, date, photo, description} = req.body;

    db.run(
        "UPDATE Avis SET idAnimal=?, typeSignalement=?, date=?, photo=?, description=? WHERE idAvis=?",
        [idAnimal, typeSignalement, date, photo, description, id],
        function(err) {
            if(err) {
                return res.status(500).json({erreur: err.message});
            }

            res.json({
                message:"Avis modifié",
                id: idAvis
            });
        }
    );
};

// Controller Delete
exports.deleteAvis = (req,res) => {
    const id = req.params.idAvis;

    if (!id) {
        return res.status(400).json({message: "ID manquant"});
    }

    db.run(
        "DELETE FROM Avis WHERE idAvis=?",
        [id],
        function(err){
            if (err) {
            console.error(err);
            return res.status(500).json({erreur: err.message});
            }
        
            if (this.changes === 0) {
                return res.status(404).json({message: "Aucun avis trouvé avec cet ID"})
            }

            res.json({message: "Avis supprimé", id:idAvis});
        }
    );
};