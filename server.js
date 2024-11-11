const express =  require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tanvi@835',
    database: 'cafe_website'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Root route
app.get('/', (req, res) => {
    res.redirect('/login.html'); // Redirect to login page
});

// Register user
app.post('/register', (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    // Hash password
    //bcrypt.hash(password, 10, (err, hash) => {
       // if (err) throw err;

       if (!password) {
        return res.status(400).send('Password is required');
    }

    // Then, hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Insert user into the database
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hash], (err, result) => {
            if (err) throw err;
            res.send('user registered successfully');
        });
    });

});

// Login user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);

    // Check if the user exists in the database
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];

            //Compare the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.user = user;
                    res.send('wow');
                } 
                else {
                    res.send('Incorrect password');
                }
            });
        } else {
            res.send('User not found');
        }
    });
});









// Logout user
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login.html');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
