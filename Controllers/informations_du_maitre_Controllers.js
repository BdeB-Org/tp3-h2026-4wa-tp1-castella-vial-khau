const db = require("../Config/database");

//Controller Get
exports.getMaitre = (req,res) => {
    db.all("SELECT * FROM Information_du_maitre", (err,rows)=> {
        res.json(rows);
    });
};

//Controller Get by ID
exports.getMaitreById = (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM Information_du_maitre WHERE Id_maitre=?", [id], (err, row) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (!row) return res.status(404).json({ message: "Maître non trouvé" });
        res.json(row);
    });
};

//Controller Post
exports.addMaitre = (req,res) => {
    const Prenom = req.body.Prenom;
    const Nom = req.body.Nom;
    const NoTelephone = req.body.NoTelephone;
    const Courriel = req.body.Courriel;
    const Age = req.body.Age;
    const Adresse = req.body.Adresse;
    const Ville = req.body.Ville;

    console.log ("Insertion",  Prenom, Nom, NoTelephone, Courriel, Age, Adresse, Ville);

    db.run(
        "INSERT INTO Information_du_maitre(Prenom, Nom, NoTelephone, Courriel, Age, Adresse, Ville) VALUES (?,?,?,?,?,?,?)",
        [Prenom, Nom, NoTelephone, Courriel, Age, Adresse, Ville],
        function(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }

            res.json( {
                message:"Information du maître ajouté!",
                id:this.lastID
            });
        }
    );
};

//Controller Update
exports.updateMaitre = (req,res) => {
    const id = req.params.id;
    const {Prenom, Nom, NoTelephone, Courriel, Age, Adresse, Ville} = req.body;
    
    db.run(
        "UPDATE Information_du_maitre SET Prenom=?, Nom=?, NoTelephone=?, Courriel=?, Age=?, Adresse=?, Ville=? WHERE Id_maitre=?",
        [Prenom, Nom, NoTelephone, Courriel, Age, Adresse, Ville, id],
        function(err) {
            if(err) {
                return res.status(500).json({erreur: err.message});
            }

            res.json({
                message:"Maître modifié",
                id: id
            });
        }
    );
};

//Controller Delete
exports.deleteMaitre = (req,res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({message: "ID manquant"});
    }

    db.run(
        "DELETE FROM Information_du_maitre WHERE Id_maitre=?",
        [id],
        function(err) {
            if(err){
                console.error(err);
                return res.status(500).json({erreur: err.message});
            }

            if(this.changes === 0) {
                return res.status(404).json({message :"Aucun maître trouvé avec cet ID"})
            }

            res.json({message:"Maître supprimé", id:id});
        }
    );
};