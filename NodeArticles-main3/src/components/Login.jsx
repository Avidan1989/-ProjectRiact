import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.css';
import { AuthContext } from './AuthContext';

function Login() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('אנא מלא את כל השדות');
      return;
    }

    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Ensure the server returns a user object with a role property (e.g., role: "admin")
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/main-page');
      } else {
        setError(data.message || 'שגיאה בהתחברות');
      }
    } catch (err) {
      console.error(err);
      setError('שגיאה בהתחברות לשרת');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            minLength="3" 
          />
        </div>
        <div>
          <label>סיסמה</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength="6" 
          />
        </div>
        <button type="submit">התחבר</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <button onClick={handleRegister} className="register-button">
        הרשמה
      </button>
    </div>
  );
}

export default Login;
