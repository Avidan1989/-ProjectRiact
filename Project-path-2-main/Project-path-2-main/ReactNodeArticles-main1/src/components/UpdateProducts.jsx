import React, { useState } from "react";
import "../assets/styles/MangerProduct.css";

const UpdateProduct = ({
  product,
  setEditProduct,
  products,
  setProducts,
  setError,
  error,
}) => {
  const [editProductState, setEditProductState] = useState({ ...product });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProductState((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      editProductState &&
      editProductState.name &&
      editProductState.manufacturer &&
      editProductState.price &&
      editProductState.experienceDate &&
      editProductState.quantity
    ) {
      try {
        console.log(
          "Sending PUT request to:",
          `http://localhost:8801/prods/products/${editProductState.id}`
        );
        console.log("Request body:", {
          ...editProductState,
          experienceDate: formatDate(editProductState.experienceDate),
        });

        const response = await fetch(
          `http://localhost:8801/prods/products/${editProductState.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...editProductState,
              experienceDate: formatDate(editProductState.experienceDate),
            }),
          }
        );

        console.log("Response status:", response.status);
        if (response.ok) {
          const updatedProduct = await response.json();
          console.log("Updated product:", updatedProduct);
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            )
          );
          setEditProduct(null);
          setError("");
        } else {
          const errorData = await response.json();
          setError("עריכת המוצר נכשלה");
          console.error("Server Error:", errorData);
        }
      } catch (error) {
        setError("שגיאה במהלך שליחת הנתונים");
        console.error("Error:", error);
      }
    } else {
      setError("יש למלא את כל השדות");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="form-container">
      <h2>עריכת מוצר</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleEditSubmit}>
        <div>
          <label htmlFor="editName">שם מוצר:</label>
          <input
            type="text"
            id="editName"
            name="name"
            value={editProductState.name}
            onChange={handleEditChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="editManufacturer">יצרן:</label>
          <input
            type="text"
            id="editManufacturer"
            name="manufacturer"
            value={editProductState.manufacturer}
            onChange={handleEditChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="editPrice">מחיר:</label>
          <input
            type="number"
            step="0.01"
            id="editPrice"
            name="price"
            value={editProductState.price}
            onChange={handleEditChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="editExperienceDate">תאריך תפוגה:</label>
          <input
            type="date"
            id="editExperienceDate"
            name="experienceDate"
            value={formatDate(editProductState.experienceDate)}
            onChange={handleEditChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="editQuantity">כמות:</label>
          <input
            type="number"
            id="editQuantity"
            name="quantity"
            value={editProductState.quantity}
            onChange={handleEditChange}
            required
            autoComplete="off"
          />
        </div>
        <button type="submit">שמור שינויים</button>
        <button type="button" onClick={() => setEditProduct(null)}>
          בטל
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
