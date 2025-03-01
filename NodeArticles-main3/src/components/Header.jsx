import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import logo from '../assets/img/logo.png';
import '../assets/styles/Header.css'

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault(); // למנוע התנהגות ברירת מחדל של הלינק
    try {
      const response = await fetch('/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // כאשר לוחצים על Home, אם המשתמש מחובר הוא ינותב ל-main-page ואם לא ל-login.
  const homeLink = user ? '/main-page' : '/login';

  return (
    <header>
      <div className="container">
        <div className="header__wrap">
          <div className="logo">
            {user ? (
              <Link to="/main-page">
                <img src={logo} alt="logo" />
                <span className="slogan">
                  CartFlow
                  <br />
                  (CoffeeCart Management Website)
                </span>
              </Link>
            ) : (
              <Link to="/login">
                <img src={logo} alt="logo" />
                <span className="slogan">
                  CartFlow
                  <br />
                  (CoffeeCart Management Website)
                </span>
              </Link>
            )}
          </div>
          <nav>
            <ul className="menu">
              <li>
                <NavLink
                  to={homeLink}
                  className={({ isActive }) =>
                    isActive ? 'menu-item active' : 'menu-item'
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? 'menu-item active' : 'menu-item'
                  }
                >
                  About
                </NavLink>
              </li>
              {user && (
                <li>
                  <Link to="#" onClick={handleLogout} className="menu-item">
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
