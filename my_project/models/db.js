const mysql = require('mysql2');
require('dotenv').config();

// Tworzenie połączenia z bazą danych
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const db = pool.promise();

// Test połączenia z bazą danych
db.query('SELECT 1')
    .then(() => console.log('Połączenie z bazą danych działa poprawnie'))
    .catch(err => console.error('Błąd połączenia z bazą danych:', err));


// Eksportowanie obiektu db dla innych modułów
module.exports = db;
