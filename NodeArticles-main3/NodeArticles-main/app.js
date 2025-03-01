const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const workersRoutes = require('./routes/workers');
const articlesRoutes = require('./routes/articles');

const port = 8801;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
}));

app.use(session({
  name: 'bar_user', // שם הקוקי
  secret: 'your_secret_key', // החלף למפתח סודי חזק
  resave: false,
  saveUninitialized: true, // מאפשר יצירת session גם אם אין שינוי
  cookie: {
      secure: false,    // בסביבת HTTP
      httpOnly: true,
      sameSite: 'lax'   // מתאים לרוב סביבות הפיתוח עם פרוקסי
  }
}));

// הנתיבים
app.use('/articles', articlesRoutes);
app.use('/workers', workersRoutes);
app.use('/users', userRoutes);
app.use('/prods', (req, res, next) => {
    console.log(`Received request at /prods: ${req.method} ${req.url}`);
    next();
}, productRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
