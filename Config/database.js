const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./BD_Registre_animaux.db");

module.exports = db;
