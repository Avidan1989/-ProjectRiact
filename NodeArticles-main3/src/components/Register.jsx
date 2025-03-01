import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Register.css';

const Register = () => {
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!idNumber.match(/^\d{9}$/)) {
      setErrorMessage('מספר תעודת זהות חייב להכיל 9 ספרות');
      return false;
    }
    if (!phone.match(/^\d{10}$/)) {
      setErrorMessage('טלפון חייב להכיל 10 ספרות');
      return false;
    }
    if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)) {
      setErrorMessage('הסיסמה חייבת להכיל לפחות 8 תווים, כולל אותיות וספרות');
      return false;
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setErrorMessage('כתובת הדוא"ל אינה תקינה');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!validateForm()) return;

    const userCredentials = {
      id_number: idNumber,
      email,
      phone,
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      role,
    };

    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('ההרשמה בוצעה בהצלחה. מנותבים להתחברות...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setErrorMessage(data.message || 'שגיאה בהרשמה');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('משהו השתבש. אנא נסה שוב מאוחר יותר.');
    }
  };

  return (
    <div className="register-container">
      <h2>הרשמה</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          מספר תעודת זהות (9 ספרות)
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
        </label>
        <label>
          דוא"ל
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          טלפון (10 ספרות)
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          שם פרטי
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          שם משפחה
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          שם משתמש
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3" />
        </label>
        <label>
          סיסמה
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8" />
        </label>
        <label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">בחר תפקיד</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </label>
        <button type="submit">הרשם</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
  
};

export default Register;
