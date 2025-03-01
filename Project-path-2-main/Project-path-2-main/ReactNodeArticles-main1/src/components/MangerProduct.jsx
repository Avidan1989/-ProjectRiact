import React, { useState, useEffect } from 'react';
import '../assets/styles/MangerProduct.css';
import UpdateProduct from './UpdateProducts';

const ManagerProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    manufacturer: '',
    price: '',
    experienceDate: '',
    quantity: '',
  });
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/prods/products');
        const data = await response.json();
        const formattedData = data.map(product => ({
          ...product,
          price: parseFloat(product.price),
          experienceDate: formatDate(product.experienceDate),
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.manufacturer
      && newProduct.price && newProduct.experienceDate
      && newProduct.quantity) {
      try {
        const response = await fetch('/prods/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        if (response.ok) {
          const addedProduct = await response.json();
          setProducts((prevProducts) => [
            ...prevProducts,
            {
              ...addedProduct,
              price: parseFloat(newProduct.price),
              quantity: parseInt(newProduct.quantity),
              experienceDate: formatDate(newProduct.experienceDate),
            },
          ]);
          setNewProduct({
            name: '',
            manufacturer: '',
            price: '',
            experienceDate: '',
            quantity: '',
          });
          setError('');
        } else {
          const errorData = await response.json();
          setError('הוספת המוצר נכשלה');
          console.error('Server Error:', errorData);
        }
      } catch (error) {
        setError('שגיאה במהלך שליחת הנתונים');
        console.error('Error:', error);
      }
    } else {
      setError('יש למלא את כל השדות');
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>הוספת מוצר חדש</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">שם מוצר:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="manufacturer">יצרן:</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={newProduct.manufacturer}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="price">מחיר:</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="experienceDate">תאריך תפוגה:</label>
            <input
              type="date"
              id="experienceDate"
              name="experienceDate"
              value={newProduct.experienceDate}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="quantity">כמות:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit">הוסף מוצר</button>
        </form>
      </div>
      <div className="product-list-container">
        <h1>רשימת מלאי</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.manufacturer} - ₪{product.price.toFixed(2)} - תאריך תפוגה: {formatDate(product.experienceDate)} - כמות: {product.quantity}
              <button onClick={() => setEditProduct(product)}>ערוך</button>
            </li>
          ))}
        </ul>
      </div>
      {editProduct && (
        <UpdateProduct
          product={editProduct}
          setEditProduct={setEditProduct}
          products={products}
          setProducts={setProducts}
          setError={setError}
        />
      )}
    </div>
  );
};

export default ManagerProduct;
