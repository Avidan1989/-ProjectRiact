import React, { useState, useEffect, useContext } from 'react';
import '../assets/styles/MangerProduct.css';
import UpdateProduct from './UpdateProducts';
import { AuthContext } from './AuthContext';

const ManagerProduct = () => {
  const { user } = useContext(AuthContext);
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

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/prods/products', { credentials: 'include' });
        if (!response.ok) throw new Error('שגיאה בהבאת המוצרים');
        const data = await response.json();
        const formattedData = data.map(product => ({
          ...product,
          price: parseFloat(product.price),
          experienceDate: formatDate(product.experienceDate),
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('לא ניתן להוריד את המוצרים מהשרת');
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.manufacturer ||
      !newProduct.price ||
      !newProduct.experienceDate ||
      !newProduct.quantity
    ) {
      setError('יש למלא את כל השדות');
      return;
    }
    if (newProduct.price <= 0 || newProduct.quantity <= 0) {
      setError('מחיר וכמות חייבים להיות חיוביים');
      return;
    }
    try {
      const response = await fetch('/prods/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const addedProduct = await response.json();
        setProducts(prev => [
          ...prev,
          {
            ...addedProduct,
            price: parseFloat(newProduct.price),
            quantity: parseInt(newProduct.quantity),
            experienceDate: formatDate(newProduct.experienceDate),
          },
        ]);
        setNewProduct({ name: '', manufacturer: '', price: '', experienceDate: '', quantity: '' });
        setError('');
      } else {
        const errorData = await response.json();
        setError('הוספת המוצר נכשלה');
        console.error('Server Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('שגיאה במהלך שליחת הנתונים');
    }
  };

  return (
    <div className="app-container">
      {user?.role === 'admin' && (
        <div className="form-container">
          <h2>הוספת מוצר חדש</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>
              שם מוצר:
              <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
            </label>
            <label>
              יצרן:
              <input type="text" name="manufacturer" value={newProduct.manufacturer} onChange={handleChange} required />
            </label>
            <label>
              מחיר:
              <input type="number" step="0.01" name="price" value={newProduct.price} onChange={handleChange} required />
            </label>
            <label>
              תאריך תפוגה:
              <input type="date" name="experienceDate" value={newProduct.experienceDate} onChange={handleChange} required />
            </label>
            <label>
              כמות:
              <input type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} required />
            </label>
            <button type="submit">הוסף מוצר</button>
          </form>
        </div>
      )}
      <div className="product-list-container">
        <h1>רשימת מלאי</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.manufacturer} - ₪{product.price.toFixed(2)} - תאריך תפוגה: {formatDate(product.experienceDate)} - כמות: {product.quantity}
              {user?.role === 'admin' && (
                <button onClick={() => setEditProduct(product)}>ערוך</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user?.role === 'admin' && editProduct && (
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
