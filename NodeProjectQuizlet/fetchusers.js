const mysql = require('mysql2');
const fs = require('fs');
const express = require('express');
const bcrypt = require('bcrypt');  // Pour sécuriser le mot de passe
const app = express();
app.use(express.json());
// Configuration de la base de données
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Ariste974$',
  database: 'quizlet'
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Requête pour récupérer l'utilisateur par email
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).send('Database error');

    if (result.length > 0) {
      const user = result[0];

      // Vérifier si le mot de passe correspond (ici on suppose que le mot de passe est hashé)
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          res.status(200).send({ message: 'Login successful', user });
        } else {
          res.status(400).send({ message: 'Invalid credentials' });
        }
      });
    } else {
      res.status(400).send({ message: 'User not found' });
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
// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
