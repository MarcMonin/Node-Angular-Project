// we need to import the following packages to run the backend server
import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import mysql from 'mysql2';
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather API',
      version: '1.0.0',
      description: 'API documentation for the Weather app',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions); 

// We need to create an express application and define the port numberimport mysql from 'mysql2';

const app = express();
const port = 3000;

// We need to use the express.json() middleware to translate JSON request bodies
app.use(express.json());
app.use(cors());

// We need to define the API key and the base URL for the OpenWeatherMap API
const API_KEY = 'd7d064027337f40818120e37735b771e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const OPEN_METEO_URL = 'https://archive-api.open-meteo.com/v1/archive';

/**
 * @swagger
 * /api/liveness:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       200:
 *         description: The server is running
 */
app.get('/api/liveness', (req: Request, res: Response) => {
  res.status(200).send('OK pour le get');
});

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get the weather information for a specific city
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the city
 *     responses:
 *       200:
 *         description: The weather data for the specified city
 *       400:
 *         description: The city name is missing in the request
 *       500:
 *         description: Error fetching the weather data
 */
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

    /**
     * @swagger
     * /api/weather-details:
     *   get:
     *     summary: Get certain weather details for a city (humidity, wind speed, temperature)
     *     parameters:
     *       - in: query
     *         name: city
     *         schema:
     *           type: string
     *         required: true
     *         description: The name of the city
     *       - in: query
     *         name: detail
     *         schema:
     *           type: string
     *           enum: [temperature, humidity, wind]
     *         required: true
     *         description: The type of weather detail to get
     *     responses:
     *       200:
     *         description: The requested weather detail
     *       400:
     *         description: The city name or detail is missing in the request
     *       500:
     *         description: Error fetching the weather detail
     */
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
    
    /**
     * @swagger
     * /api/weather-by-coordinates:
     *   get:
     *     summary: Get the weather data by using latitude and longitude
     *     parameters:
     *       - in: query
     *         name: lat
     *         schema:
     *           type: string
     *         required: true
     *         description: The latitude of the location
     *       - in: query
     *         name: lon
     *         schema:
     *           type: string
     *         required: true
     *         description: The longitude of the location
     *     responses:
     *       200:
     *         description: The weather data for the given coordinates
     *       400:
     *         description: The latitude or longitude is missing
     *       500:
     *         description: Error fetching the weather data by coordinates
     */
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
    
    /**
     * @swagger
     * /api/forecast:
     *   get:
     *     summary: Get the weather forecast for a specific city
     *     parameters:
     *       - in: query
     *         name: city
     *         schema:
     *           type: string
     *         required: true
     *         description: The name of the city
     *     responses:
     *       200:
     *         description: The weather forecast data for the specified city
     *       400:
     *         description: The city name is missing in the request
     *       500:
     *         description: Error fetching the forecast data
     */
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
    
  /**
   * @swagger
   * /api/historical:
   *   get:
   *     summary: Get the historical weather data for a specific location and a date range
   *     parameters:
   *       - in: query
   *         name: latitude
   *         schema:
   *           type: string
   *         required: true
   *         description: The latitude of the location
   *       - in: query
   *         name: longitude
   *         schema:
   *           type: string
   *         required: true
   *         description: The longitude of the location
   *       - in: query
   *         name: start_date
   *         schema:
   *           type: string
   *           format: date
   *         required: true
   *         description: The start date for the historical data
   *       - in: query
   *         name: end_date
   *         schema:
   *           type: string
   *           format: date
   *         required: true
   *         description: The end date for the historical data
   *     responses:
   *       200:
   *         description: The historical weather data for the specified location and date range
   *       400:
   *         description: There are missing required parameters
   *       500:
   *         description: Failed to fetch historical weather data
   */
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
          temperature_unit: 'celsius',
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

  /**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authentification of a user with their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful authentication
 *       400:
 *         description: Missing email or password in the request
 *       401:
 *         description: Invalid mail or password
 *       500:
 *         description: Server error
 */
  app.post('/api/login', (req: Request, res: Response):void => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
        res.status(400).send({ message: 'All fields are required.' });
        return;
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results: any[]):void => {
        if (err) {
            console.error('Error during credential verification:', err);
            res.status(500).send({ message: 'Server error.' });
            return;
        }

        if (results.length > 0) {
            const user = {
                id: results[0].id,
                email: results[0].email
            };
            res.status(200).send({ message: 'Login successful', user });
        } else {
            res.status(401).send({ message: 'Invalid credentials.' });
        }
    });
  });


  /**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email for the new user
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *     responses:
 *       201:
 *         description: User is successfully registered
 *       400:
 *         description: Missing email or password in the request
 *       500:
 *         description: Server error
 */
  app.post('/api/register', (req: Request, res: Response):void => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
        res.status(400).send({ message: 'Email and password are required.' });
        return;
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result):void => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send({ message: 'Internal server error.' });
            return;
        }
        res.status(201).send({ message: 'User successfully registered.' });
    });
  });


  /**
 * @swagger
 * /api/favourites/{userId}:
 *   get:
 *     summary: Get the favorite cities of a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of favorite cities
 *       500:
 *         description: Server error
 */
  app.get('/api/favourites/:userId', (req: Request, res: Response): void => {
    const userId = req.params.userId;

    const sql = 'SELECT * FROM favourites WHERE user_id = ?';
    db.query(sql, [userId], (err, results: any[]): void => {
        if (err) {
            console.error('Error retrieving favorites:', err);
            res.status(500).send({ message: 'Server error.' });
            return;
        }

        res.status(200).send({ favourites: results });
    });
  });

  /**
 * @swagger
 * /api/favourites:
 *   post:
 *     summary: Add a city to a user's favorites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               cityName:
 *                 type: string
 *                 description: The name of the city to add
 *     responses:
 *       201:
 *         description: The city is successfully added to favorites
 *       400:
 *         description: Missing userId or cityName in the request
 *       500:
 *         description: Server error
 */
  app.post('/api/favourites', (req: Request, res: Response): void => {
    const { userId, cityName } = req.body;

    if (!userId || !cityName) {
        res.status(400).send({ message: 'UserId and cityName are required.' });
        return;
    }

    const sql = 'INSERT INTO favourites (user_id, city_name) VALUES (?, ?)';
    db.query(sql, [userId, cityName], (err, result): void => {
        if (err) {
            console.error('Error adding favorite:', err);
            res.status(500).send({ message: 'Server error.' });
            return;
        }

        res.status(201).send({ 
            message: 'City added to favorites.',
            favourite: { userId, cityName }
        });
    });
  });
  

  /**
 * @swagger
 * /api/favourites:
 *   delete:
 *     summary: Remove a city from a user's favorites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               cityName:
 *                 type: string
 *                 description: The name of the city to remove
 *     responses:
 *       200:
 *         description: The city is successfully removed from favorites
 *       400:
 *         description: Missing userId or cityName in the request
 *       404:
 *         description: Favorite city was not found
 *       500:
 *         description: Server error
 */
  app.delete('/api/favourites', (req: Request, res: Response): void => {
    const { userId, cityName } = req.body;
    console.log(req.body);
    if (!userId || !cityName) {
        res.status(400).send({ message: 'UserId and cityName are required.' });
        return;
    }

    const sql = 'DELETE FROM favourites WHERE user_id = ? AND city_name = ?';
    db.query(sql, [userId, cityName], (err, result: any): void => {
        if (err) {
            console.error('Error deleting favorite:', err);
            res.status(500).send({ message: 'Server error.' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Favorite not found.' });
            return;
        }

        res.status(200).send({ 
            message: 'City removed from favorites.',
            removed: { userId, cityName }
        });
    });
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
  
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});