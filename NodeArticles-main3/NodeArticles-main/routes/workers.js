const express = require('express');
const router = express.Router();
const dbSingleton = require('../dbSingleton');
const db = dbSingleton.getConnection('products_db');
const { isAuthenticated, checkRole } = require('./middleware');

// הוספת עובדים – רק admin
router.post('/add', isAuthenticated, checkRole('admin'), (req, res) => {
  const workers = req.body;

  if (!Array.isArray(workers) || workers.length === 0) {
    return res.status(400).json({ error: 'לא התקבלו נתונים' });
  }

  workers.forEach(worker => {
    const { day, employee_name, date, hours } = worker;

    if (!day || !employee_name || !date || !hours) {
      return res.status(400).json({ error: 'חסרים שדות' });
    }

    const query = `
      INSERT INTO workers (day, employee_name, date, hours)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [day, employee_name, date, hours], (err, results) => {
      if (err) {
        console.error('שגיאה בהוספת עובד:', err);
        return res.status(500).json({ error: 'שגיאה בהוספת עובד' });
      }
      console.log('Employee added successfully:', results);
    });
  });

  res.status(201).json({ message: 'העובדים נשמרו בהצלחה ב-DB' });
});

// מחיקת כל העובדים – רק admin
router.delete('/delete', isAuthenticated, checkRole('admin'), (req, res) => {
  const query = 'DELETE FROM workers';

  db.query(query, (err, results) => {
    if (err) {
      console.error('שגיאה במחיקת עובדים:', err);
      return res.status(500).json({ error: 'שגיאה במחיקת עובדים' });
    }
    console.log('All employees deleted:', results);
    res.json({ message: 'העובדים נמחקו בהצלחה' });
  });
});

// קבלת כל העובדים – לכל משתמש מחובר
router.get('/', isAuthenticated, (req, res) => {
  const query = 'SELECT * FROM workers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('שגיאה בקבלת עובדים:', err);
      return res.status(500).json({ error: 'שגיאה בקבלת עובדים' });
    }

    console.log('Results from DB:', results);

    const formattedResults = results.map(result => ({
      "יום": result.day,
      "שם עובד": result.employee_name,
      "תאריך": result.date,
      "שעות": result.hours
    }));

    res.json(formattedResults);
  });
});

module.exports = router;
