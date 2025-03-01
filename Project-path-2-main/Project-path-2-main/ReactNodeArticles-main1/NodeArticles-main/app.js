const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const articleRoutes = require('./routes/articles');
const port = 8801;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/prods', (req, res, next) => {
  console.log(`Received request at /prods: ${req.method} ${req.url}`);
  next();
}, productRoutes);
app.use('/articles', articleRoutes);

app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
