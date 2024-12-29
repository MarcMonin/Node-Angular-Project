import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';

// Initialisation de l'application Express
const app = express();
const port = 3000;

// Activer CORS
app.use(cors());

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'weather_login',
});

// Route de connexion
app.post('/api/login', (req: Request, res: Response):void => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
        res.status(400).send({ message: 'Tous les champs sont requis.' });
        return;
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results: any[]):void => {
        if (err) {
            console.error('Erreur lors de la vérification des identifiants:', err);
             res.status(500).send({ message: 'Erreur serveur.' });
             return;
        }

        if (results.length > 0) {
            const user = {
                id: results[0].id,
                email: results[0].email
            };
            res.status(200).send({ message: 'Connexion r?ussie', user });
        } else {
            res.status(401).send({ message: 'Identifiants invalides.' });
        }
    });
});

// Route d'enregistrement
app.post('/api/register', (req: Request, res: Response):void => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
         res.status(400).send({ message: 'Email et mot de passe sont obligatoires.' });
         return;
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result):void => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données :', err.message);
             res.status(500).send({ message: 'Erreur interne du serveur.' });
             return;
        }
        res.status(201).send({ message: 'Utilisateur enregistré avec succès.' });
    });
});

// Route pour r?cup?rer les villes favorites d'un utilisateur
app.get('/api/favourites/:userId', (req: Request, res: Response): void => {
    const userId = req.params.userId;

    const sql = 'SELECT * FROM favourites WHERE user_id = ?';
    db.query(sql, [userId], (err, results: any[]): void => {
        if (err) {
            console.error('Erreur lors de la r?cup?ration des favoris:', err);
            res.status(500).send({ message: 'Erreur serveur.' });
            return;
        }

        res.status(200).send({ favourites: results });
    });
});

// Route pour ajouter une ville favorite
app.post('/api/favourites', (req: Request, res: Response): void => {
    const { userId, cityName } = req.body;

    if (!userId || !cityName) {
        res.status(400).send({ message: 'UserId et cityName sont requis.' });
        return;
    }

    const sql = 'INSERT INTO favourites (user_id, city_name) VALUES (?, ?)';
    db.query(sql, [userId, cityName], (err, result): void => {
        if (err) {
            console.error('Erreur lors de l\'ajout du favori:', err);
            res.status(500).send({ message: 'Erreur serveur.' });
            return;
        }

        res.status(201).send({ 
            message: 'Ville ajout?e aux favoris',
            favourite: { userId, cityName }
        });
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
