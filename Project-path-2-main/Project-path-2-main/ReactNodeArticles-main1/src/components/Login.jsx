import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // מצב התחברות או רישום
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/users/login' : '/users/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'user' }) // ברישום, תפקיד ברירת מחדל הוא 'user'
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login/Register successful:', data);
        navigate('/'); // נווט לעמוד הראשי לאחר התחברות מוצלחת
        setError('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error occurred');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'התחברות' : 'הרשמה'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'התחברות' : 'הרשמה'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'אין לך חשבון? הרשם כאן' : 'יש לך חשבון? התחבר כאן'}
      </button>
    </div>
  );
};

export default Login;
