const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./models/db');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Trasy
const routes = require('./routes/index');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});


app.use(express.static('public'));

app.get('/biblioteka', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/logowanie');
    }
    res.render('biblioteka', { username: req.session.user });
});
