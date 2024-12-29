const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql2');
// Activer CORS
app.use(cors());

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Ton utilisateur MySQL
  password: 'Ariste974$', // Ton mot de passe MySQL
  database: 'quizlet' // Le nom de ta base de données
});

// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Tous les champs sont requis.' });
  }

  // Requête SQL pour vérifier l'email et le mot de passe
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification des identifiants:', err);
      return res.status(500).send({ message: 'Erreur serveur.' });
    }

    if (results.length > 0) {
      // Connexion réussie
      res.status(200).send({ message: 'Connexion réussie', user: results[0] });
    } else {
      // Identifiants invalides
      res.status(401).send({ message: 'Identifiants invalides.' });
    }
  });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email et mot de passe sont obligatoires.' });
  }

  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données :', err.message);
      return res.status(500).send({ message: 'Erreur interne du serveur.' });
    }
    res.status(201).send({ message: 'Utilisateur enregistré avec succès.' });
  });
});
// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
