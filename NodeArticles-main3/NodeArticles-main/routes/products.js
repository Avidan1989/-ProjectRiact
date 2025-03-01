const express = require('express');
const router = express.Router();
const dbSingleton = require('../dbSingleton');
const db = dbSingleton.getConnection('products_db');

const { isAuthenticated, checkRole } = require('./middleware');

// פונקציה לאימות נתונים
const validateProductData = (name, manufacturer, price, experienceDate, quantity) => {
  if (!name || !manufacturer || !price || !experienceDate || !quantity) {
    return 'חסרים שדות חובה';
  }
  if (isNaN(price) || price <= 0) {
    return 'מחיר חייב להיות מספר חיובי';
  }
  if (isNaN(quantity) || quantity <= 0) {
    return 'כמות חייבת להיות מספר חיובי';
  }
  if (isNaN(Date.parse(experienceDate))) {
    return 'תאריך תפוגה אינו תקני';
  }
  return null;
};

// הוספת מוצר – רק admin
router.post('/products', isAuthenticated, checkRole('admin'), (req, res) => {
  const { name, manufacturer, price, experienceDate, quantity } = req.body;
  const validationError = validateProductData(name, manufacturer, price, experienceDate, quantity);
  
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const query = `
    INSERT INTO products (name, manufacturer, price, experienceDate, quantity)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [name, manufacturer, price, experienceDate, quantity], (err, results) => {
    if (err) {
      console.error('שגיאה בהוספת מוצר:', err);
      return res.status(500).json({ error: 'שגיאה בהוספת מוצר' });
    }
    res.status(201).json({
      id: results.insertId,
      name,
      manufacturer,
      price,
      experienceDate,
      quantity
    });
  });
});

// עדכון מוצר – רק admin
router.put('/products/:id', isAuthenticated, checkRole('admin'), (req, res) => {
  console.log(`Update request received for product ID: ${req.params.id}`);
  const { id } = req.params;
  const { name, manufacturer, price, experienceDate, quantity } = req.body;

  const validationError = validateProductData(name, manufacturer, price, experienceDate, quantity);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const query = `
    UPDATE products SET name = ?, manufacturer = ?, price = ?, experienceDate = ?, quantity = ?
    WHERE id = ?
  `;
  db.query(query, [name, manufacturer, price, experienceDate, quantity, id], (err, results) => {
    if (err) {
      console.error('שגיאה בעריכת מוצר:', err);
      return res.status(500).json({ error: 'שגיאה בעריכת מוצר' });
    }
    if (results.affectedRows === 0) {
      console.log('Product not found with id:', id);
      return res.status(404).json({ error: 'המוצר לא נמצא' });
    }
    console.log('Product updated successfully:', { id, name, manufacturer, price, experienceDate, quantity });
    res.json({
      id,
      name,
      manufacturer,
      price,
      experienceDate,
      quantity
    });
  });
});

// קבלת כל המוצרים – GET פתוח לכולם
router.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('שגיאה בקבלת מוצרים:', err);
      return res.status(500).json({ error: 'שגיאה בקבלת מוצרים' });
    }
    res.json(results);
  });
});

module.exports = router;
