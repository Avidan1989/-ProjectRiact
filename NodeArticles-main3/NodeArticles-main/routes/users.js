const express = require('express');
const bcrypt = require('bcrypt');
const dbSingleton = require('../dbSingleton');
const db = dbSingleton.getConnection('products_db');
const router = express.Router();

// *** Route for user registration ***
router.post('/register', async (req, res) => {
    const { id_number, email, phone, first_name, last_name, username, password, role } = req.body;

    if (!id_number || !email || !phone || !first_name || !last_name || !username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
        return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    try {
        const queryCheck = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(queryCheck, [username, email], async (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const queryInsert = `
                INSERT INTO users (id_number, email, phone, first_name, last_name, username, password_hash, role)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(queryInsert, [id_number, email, phone, first_name, last_name, username, passwordHash, role], (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ message: 'Error inserting user' });
                }

                res.status(201).json({
                    message: 'User registered successfully',
                    userId: results.insertId,
                    username,
                    email
                });
            });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// *** Route for user login ***
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Set the user in the session
        req.session.user = { id: user.id, username: user.username, role: user.role };
        req.session.save(() => {
            console.log('User logged in, session:', req.session);
            // Return the user object along with the message
            res.status(200).json({ message: 'Login successful', user: req.session.user });
        });
    });
});


// Route for user logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('bar_user');
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;
