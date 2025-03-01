const express = require('express');
const router = express.Router();
const dbSingleton = require('../dbSingleton');
const db = dbSingleton.getConnection('products_db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM articles';
  db.query(query, (err, results) => {
    if (err) {
      console.error('שגיאה בקבלת מאמרים:', err);
      return res.status(500).json({ error: 'שגיאה בקבלת מאמרים' });
    }
    res.json(results);
  });
});

module.exports = router;
