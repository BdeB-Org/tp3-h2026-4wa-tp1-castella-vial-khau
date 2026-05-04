//----Sandra Castella ----
const db = require('../Config/database.js');

//----controller GET----------------------------
exports.getInfosMedicales = (req, res) => {
    db.all("SELECT * FROM InformationsMedicales", (err, rows) => {  
        if (err) return res.status(500).json({ erreur: err.message });
        res.json(rows);
    });
};

//----controller POST--------------------------------
exports.addInfosMedicales = (req, res) => {
    const const_clinique = req.body.const_clinique;  //---------est-ce que je dois la mettre?
    const Medicaments = req.body.Medicaments;
    const Maladies = req.body.Maladies;
    const Blessures = req.body.Blessures;

    console.log("insertion", const_clinique, Medicaments, Maladies, Blessures);

    //----Vérifier de la clé étrangère const_clinique-------------------
    db.get("SELECT * FROM InformationsMedicales", (err, row) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (!row) return res.status(400).json({ message: "Clinique invalide" });

        db.run(
            'INSERT INTO "InformationsMedicales"(const_clinique, Medicaments, Maladies, Blessures) VALUES (?,?,?,?)',
            [const_clinique, Medicaments, Maladies, Blessures],
            function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ erreur: err.message });
                }
                res.json({
                    message: "info médicale ajoutée",
                    id: this.lastID
                });
            }
        );
    }
)};

//----controller UPDATE----modifier-----------------------------------------------
exports.updateInfosMedicales = (req, res) => {

    const id = req.params.ID_meds;
    const { const_clinique, Medicaments, Maladies, Blessures } = req.body;

    //----Vérification de la clé étrangère const_clinique----
    db.get("SELECT * FROM InformationsMedicales", (err, row) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (!row) return res.status(400).json({ message: "Clinique invalide" });

        db.run(
            'UPDATE "Informations Medicales" SET const_clinique=?, Medicaments=?, Maladies=?, Blessures=? WHERE ID_meds=?',
            [const_clinique, Medicaments, Maladies, Blessures, id],
            function (err) {
                if (err) return res.status(500).json({ erreur: err.message });

                res.json({
                    message: "info médicale modifiée",
                    id: id
                });
            }
        );
    });

};

//----controller DELETE ------------------------------------
exports.deleteInfosMedicales = (req, res) => {

    const id = req.params.id;

    //----Vérifier que l'id est fourni-----------------
    if (!id) {
        return res.status(400).json({ message: "Id manquant" });
    }

    //----Exécuter la requête
    db.run(
        'DELETE FROM "Informations medicales" WHERE Id_meds = ?',
        [id],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }

            //-----Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucune info médicale trouvée avec cet ID" });
            }

            res.json({ message: "info médicale supprimée", id: id });
        }
    );

};