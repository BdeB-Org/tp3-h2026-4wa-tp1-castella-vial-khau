const db = require("../Config/database");

// Controller Get
exports.getActivites = (req,res) => {
    db.all("SELECT * FROM Activites",(err,rows)=> {
        res.json(rows);
    });
};

// Controller Post
exports.addActivites = (req,res) => {
    const Type = req.body.Type;
    const Date = req.body.Date;
    const Duree = req.body.Duree;
    const Details = req.body.Details;

    console.log ("Insertion:", Type, Date, Duree, Details) ;

    db.run(
        "INSERT INTO Activites(Type, Date, Duree, Details) VALUES (?,?,?,?)",
        [Type, Date, Duree, Details],
        function(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }

            res.json({
                message:"Activité ajoutée!",
                id:this.lastID
            });
        }
    );
};

// Controller Update
exports.updateActivites = (req,res) => {
    const id = req.params.id;
    const {Type, Date, Duree, Details} = req.body;

    db.run(
        "UPDATE Activites SET Type=?, Date=?, Duree=?, Details=? WHERE id_activite=?",
        [Type, Date, Duree, Details, id],
        function(err) {
            if(err) {
                return res.status(500).json({erreur: err.message});
            }

            res.json({
                message:"Activité modifiée",
                id: id
            });
        }
    );
};

// Controller Delete
exports.deleteActivites = (req,res) => {
    const id_activite = req.params.id_activite;

    if (!id_activite) {
        return res.status(400).json({message: "ID manquant"});
    }

    db.run(
        "DELETE FROM Activites WHERE id_activite=?",
        [id_activite],
        function(err){
            if (err) {
            console.error(err);
            return res.status(500).json({erreur: err.message});
            }
        
            if (this.changes === 0) {
                return res.status(404).json({message: "Aucune activité trouvé avec cet ID"})
            }

            res.json({message: "Activité supprimée", id:id_activite});
        }
    );
};
