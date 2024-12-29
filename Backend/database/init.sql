-- Supprime la base de donn?es si elle existe d?j?
DROP DATABASE weather_login;

-- Cr?e la base de donn?es
CREATE DATABASE weather_login;
-- Utilise la base de donn?es
USE weather_login;

-- Cr?e la table users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

drop table favourites;
-- Cr?e la table favourites
CREATE TABLE favourites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_city (user_id, city_name)
);

-- Ajoute les index
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_user_id ON favourites(user_id); 