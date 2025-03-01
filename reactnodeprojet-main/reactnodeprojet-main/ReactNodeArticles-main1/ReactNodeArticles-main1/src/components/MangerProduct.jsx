import React, { useState } from 'react';
import '../assets/styles/MangerProduct.css';

const initialProducts = [
  {
    id: 1,
    name: 'חלב',
    manufacturer: 'תנובה',
    price: 5.9,
    experienceDate: '2025-06-30',
    quantity: 10,
  },
  {
    id: 2,
    name: 'יוגורט',
    manufacturer: 'יופלה',
    price: 4.5,
    experienceDate: '2025-05-15',
    quantity: 20,
  },
  {
    id: 3,
    name: 'גבינה לבנה',
    manufacturer: 'גד',
    price: 7.9,
    experienceDate: '2025-07-10',
    quantity: 15,
  },
  {
    id: 4,
    name: 'שמנת מתוקה',
    manufacturer: 'תנובה',
    price: 8.5,
    experienceDate: '2025-08-05',
    quantity: 8,
  },
  {
    id: 5,
    name: 'קוטג\'',
    manufacturer: 'תנובה',
    price: 7.0,
    experienceDate: '2025-06-25',
    quantity: 12,
  },
];

const ManagerProduct = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    manufacturer: '',
    price: '',
    experienceDate: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.manufacturer 
      && newProduct.price && newProduct.experienceDate 
      && newProduct.quantity) {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: products.length + 1,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity),
        },
      ]);
      setNewProduct({ id: '', name: '', manufacturer: '', price: '', 
        experienceDate: '', quantity: '' });
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>הוספת מוצר חדש</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">שם מוצר:</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="manufacturer">יצרן:</label>
            <input
              type="text"
              name="manufacturer"
              value={newProduct.manufacturer}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">מחיר:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="experienceDate">תאריך תפוגה:</label>
            <input
              type="date"
              name="experienceDate"
              value={newProduct.experienceDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">כמות:</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              required
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
              {product.name} - {product.manufacturer} - ₪{product.price.toFixed(2)} - תאריך תפוגה: {product.experienceDate} - כמות: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerProduct;
