import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import mysql from 'mysql2';

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());


const API_KEY = 'd7d064027337f40818120e37735b771e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const OPEN_METEO_URL = 'https://archive-api.open-meteo.com/v1/archive';

app.get('/api/liveness', (req: Request, res: Response) => {
  res.status(200).send('OK pour le get');
});

app.get('/api/weather', (req: Request, res: Response): void => {
    (async () => {
        const city = req.query.city as string;
        if (!city) {
          res.status(400).json({ error: 'City is required' });
          return;
        }
    
        try {
          const response = await axios.get(BASE_URL, {
            params: {
              q: city,
              appid: API_KEY,
              units: 'metric',
            },
          });
          res.json(response.data);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch weather data' });
        }
      })();
    });

    app.get('/api/weather-details', (req: Request, res: Response): void => {
      (async () => {
        const city = req.query.city as string;
        const detail = req.query.detail as string; // 'temperature', 'humidity', 'wind' for example
        if (!city) {
          res.status(400).json({ error: 'City is required' });
          return;
        }
        if (!detail) {
          res.status(400).json({ error: 'Detail is required (e.g., temperature, wind, humidity)' });
          return;
        }
    
        try {
          const response = await axios.get(BASE_URL, {
            params: {
              q: city,
              appid: API_KEY,
              units: 'metric',
            },
          });
    
          const weatherData = response.data;
          let result;
    
          switch (detail.toLowerCase()) {
            case 'temperature':
              result = { temperature: weatherData.main.temp };
              break;
            case 'humidity':
              result = { humidity: weatherData.main.humidity };
              break;
            case 'wind':
              result = { wind: weatherData.wind.speed };
              break;
            default:
              result = { error: 'Invalid detail requested' };
          }
    
          res.json(result);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch weather details' });
        }
      })();
    });
    
    app.get('/api/weather-by-coordinates', (req: Request, res: Response): void => {
      (async () => {
        const lat = req.query.lat as string;
        const lon = req.query.lon as string;
    
        if (!lat || !lon) {
          res.status(400).json({ error: 'Latitude and Longitude are required' });
          return;
        }
    
        try {
          const response = await axios.get(BASE_URL, {
            params: {
              lat,
              lon,
              appid: API_KEY,
              units: 'metric',
            },
          });
          res.json(response.data);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch weather data by coordinates' });
        }
      })();
    });
    

    app.get('/api/forecast', (req: Request, res: Response): void => {
      (async () => {
        const city = req.query.city as string;
        if (!city) {
          res.status(400).json({ error: 'City is required' });
          return;
        }
    
        try {
          const response = await axios.get(FORECAST_URL, {
            params: {
              q: city,
              appid: API_KEY,
              units: 'metric',
            },
          });
          res.json(response.data);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch forecast data' });
        }
      })();
    });
    

app.get('/api/historical', async (req: Request, res: Response) => {
  const { latitude, longitude, start_date, end_date } = req.query;
  console.log(req.query);
  // Validate required parameters
  if (!latitude || !longitude || !start_date || !end_date) {
    res.status(400).json({
      error: 'latitude, longitude, start_date, and end_date are required parameters',
    });
    return;
  }

  try {
    // Make API request to Open-Meteo
    const response = await axios.get(OPEN_METEO_URL, {
      params: {
        latitude,
        longitude,
        start_date,
        end_date,
        temperature_unit: 'celsius', // Optional: Set temperature unit
      },
    });

    // Respond with the historical weather data
    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Failed to fetch historical weather data' });
    }
  }
});



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

  
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
  });