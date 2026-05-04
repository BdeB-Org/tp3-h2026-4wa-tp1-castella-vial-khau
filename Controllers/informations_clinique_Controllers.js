
//----Sandra Castella ----
const db = require('../Config/database.js');

//----controller GET----------------------------
exports.getInformationsClinique = (req, res) => {
    db.all('SELECT * FROM Informations_clinique', (err, rows) => {  //----from nom de la table
        if (err) return res.status(500).json({ erreur: err.message });
        res.json(rows);
    });
};

//----controller POST--------------------------------
exports.addInformationsClinique = (req, res) => {
    const numeroClinique = req.body.numeroClinique;
    const nomClinique = req.body.nomClinique;
    const adresseClinique = req.body.adresseClinique;
    const villeClinique = req.body.villeClinique;
    const TelephoneClinique = req.body.TelephoneClinique;

    console.log("insertion", numeroClinique, nomClinique, adresseClinique, villeClinique, TelephoneClinique);

    db.run(
        "INSERT INTO Informations_clinique(numeroClinique, nomClinique, adresseClinique, villeClinique, TelephoneClinique) VALUES (?,?,?,?,?)",
        [numeroClinique, nomClinique, adresseClinique, villeClinique, TelephoneClinique],
        function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "info clinique ajoutée",
                id: this.lastID
            });
        }
    );
};

//----controller UPDATE----modifier-----------------------------------------------
exports.updateInformationsClinique = (req, res) => {

    const id = req.params.idClinique;
    const { numeroClinique, nomClinique, adresseClinique, villeClinique, TelephoneClinique } = req.body;

    db.run(
        'UPDATE Informations_clinique SET numeroClinique=?, nomClinique=?, adresseClinique=?, villeClinique=?, TelephoneClinique=? WHERE id=?',
        [numeroClinique, nomClinique, adresseClinique, villeClinique, TelephoneClinique, id],
        function (err) {

            if (err) {
                return res.status(500).json({ erreur: err.message });
            }

            res.json({
                message: "info clinique modifiée",
                id: id
            });

        }

    );

};

//----controler DELETE ------------------------------------
exports.deleteInformationsClinique = (req, res) => {

    const id = req.params.id;

    //----Vérifier que l'id est fourni----
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }

    //----Exécuter la requête
    db.run(
        "DELETE FROM Informations_clinique WHERE id_Clinique =?",
        [id],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }

            //-----Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucune info clinique trouvée avec cet ID" });
            }

            res.json({ message: "info clinique supprimée", id: id });
        }
    );

};