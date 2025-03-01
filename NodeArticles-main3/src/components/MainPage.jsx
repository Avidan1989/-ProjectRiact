import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/MainPage.css";
import salesImage from '../assets/img/sale.png';
import arrangementImage from '../assets/img/arrangement.png';
import productsImage from '../assets/img/products.png';
import messegeImage from '../assets/img/messege.png';
import reportsImage from '../assets/img/reports.png';

function MainPage() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/articles', { credentials: 'include' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          throw new Error('Received data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setError(error.message);
      });
  }, []);

  const getImage = (imageName) => {
    switch (imageName) {
      case 'productsImage': return productsImage;
      case 'arrangementImage': return arrangementImage;
      case 'reportsImage': return reportsImage;
      case 'messegeImage': return messegeImage;
      case 'salesImage': return salesImage;
      default: return null;
    }
  };

  if (error) {
    return <div className="error">שגיאה בטעינת המאמרים: {error}</div>;
  }

  return (
    <div className="main">
      <section className="articles">
        <div className="container">
          <div className="articles-container">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <Link to={article.path} className="article-image-container">
                  <img src={getImage(article.image)} alt={article.title} className="article-image" />
                </Link>
                <h2 className="article-title">{article.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
