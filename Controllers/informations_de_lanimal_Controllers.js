//Fait par Brandon Khau TP2 ---------Sandra Castella pour le TP3
const db = require("../Config/database");

//Controller Get
exports.getAnimal = (req,res) => {
    db.all("SELECT * FROM informationsAnimal", (err,rows)=> {
        res.json(rows);
    });
};

//Controller Post
exports.addAnimal = (req,res) => {
    const informationsMaitre = req.body.informationsMaitre;
    const noCollier = req.body.noCollier;
    const nom = req.body.nom;
    const type = req.body.type;
    const race = req.body.race;
    const genre = req.body.genre;
    const age = req.body.age;
    const taille = req.body.taille;
    const poids = req.body.poids;
    const infoMedicales = req.body.infoMedicales;

    console.log ("Insertion", informationsMaitre, noCollier, nom, type, race, genre, age, taille, poids, infoMedicales);

    db.run(
        "INSERT INTO InformationsAnimal(informationsMaitre, noCollier, nom, type, race, genre, age, taille, poids, infoMedicales) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [informationsMaitre, noCollier, nom, type, race, genre, age, taille, poids, infoMedicales],
        function(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }

            res.json( {
                message:"Animal ajouté!",
                id:this.lastID
            });
        }
    );
};

//-----Controller Update-----(modifier)
exports.updateAnimal = (req,res) => {
    const id = req.params.id;
    const {informationsMaitre, noCollier, nom, type, race, genre, age, taille, poids, infoMedicales} = req.body;
    
    db.run(
        "UPDATE InformationsAnimal SET informationsMaitre=?, noCollier=?, nom=?, type=?, race=?, genre=?, age=?, taille=?, poids=?, infoMedicales=? WHERE idAnimal=?",
        [informationsMaitre, noCollier, nom, type, race, genre, age, taille, poids, infoMedicales, id],
        function(err) {
            if(err) {
                return res.status(500).json({erreur: err.message});
            }

            res.json({
                message:"Animal modifié",
                id: id
            });
        }
    );
};

//Controller Delete
exports.deleteAnimal = (req,res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({message: "ID manquant"});
    }

    db.run(
        "DELETE FROM informationsAnimal WHERE idAnimal=?",
        [id],
        function(err) {
            if(err){
                console.error(err);
                return res.status(500).json({erreur: err.message});
            }

            if(this.changes === 0) {
                return res.status(404).json({message :"Aucun animal trouvé avec cet ID"})
            }

            res.json({message:"Animal supprimé", id:id});
        }
    );
};