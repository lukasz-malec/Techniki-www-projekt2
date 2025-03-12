const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const router = express.Router();


// Strona główna
router.get('/', (req, res) => {
    res.render('index', { title: 'Strona Główna' });
});

// Strona biblioteki 
router.get('/biblioteka', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/logowanie');
    }
    res.render('biblioteka', { title: 'Twoja Biblioteka', username: req.session.user });
});

// Strona koszyka
router.get('/koszyk', (req, res) => {
    res.render('koszyk', { title: 'Twój Koszyk' });
});

// Strona rejestracji
router.get('/rejestracja', (req, res) => {
    res.render('rejestracja', { title: 'Rejestracja' });
});

// Strona logowania
router.get('/logowanie', (req, res) => {
    res.render('logowanie', { title: 'Logowanie' });
});



router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Odebrane dane:', req.body);

    if (!username || !email || !password) {
        console.error('Błąd: Brak wszystkich danych');
        return res.status(400).send('Wszystkie pola są wymagane.');
    }

    try {
        const [user] = await db.query('SELECT email FROM users WHERE email = ?', [email]);

        if (user.length > 0) {
            console.error('Błąd: Email już istnieje');
            return res.status(400).send('Ten email jest już zajęty.');
        }

        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        console.log('Użytkownik został zapisany do bazy.');

        req.session.user = username;
        res.redirect('/biblioteka');
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
        res.status(500).send('Błąd podczas rejestracji.');
    }
});






router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Odebrane dane:', email, password);

    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Znaleziony użytkownik:', user);

        if (user.length === 0) {
            return res.status(400).send('Nieprawidłowy email lub hasło. dlugosc ');
        }

    
        const isMatch = password === user[0].password;  
        if (!isMatch) {
            return res.status(400).send('Nieprawidłowy email lub hasło. cos drugiego');
        }

        req.session.user = user[0].username;
        console.log('Użytkownik zalogowany:', req.session.user);
        res.redirect('/biblioteka');
    } catch (error) {
        console.error('Błąd logowania:', error);
        res.status(500).send('Błąd podczas logowania.');
    }
});




// Wylogowanie użytkownika
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;








