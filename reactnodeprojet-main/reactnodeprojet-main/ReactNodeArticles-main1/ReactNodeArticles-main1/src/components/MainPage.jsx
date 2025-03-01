import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/MainPage.css";
import salesImage from '../assets/img/sales.jpg';
import arrangementImage from '../assets/img/arrangement.jpg';
import productsImage from '../assets/img/products.jpg';
import messegeImage from '../assets/img/messege.jpg';
import reportsImage from '../assets/img/reports.jpg';


function MainPage() {
  const articles = [
    {
      id: 1,
      title: "ניהול מלאי",
      image: productsImage,
      content: "מעקב אחר מצב המלאי בעגלת הקפה.",
      path: "/manger-product"
    },
    {
      id: 2,
      title: "ניהול עובדים",
      image: arrangementImage,
      content: "ניהול סידורי העבודה עבור העובדים.",
      path: "/arrangement"
    },
    {
      id: 3,
      title: "דוחות",
      image: reportsImage,
      content: "צפייה בדוחות המכירות היומיים, שבועיים וחודשיים.",
      path: "/reports"
    },
    {
      id: 4,
      title: "מבצעים ואירועים",
      image: messegeImage,
      content: "ניהול מבצעים ואירועים עבור לקוחות העגלה.",
      path: "/messege"
    },
    {
      id: 5,
      title: " תחזוקה",ד
      image: salesImage,
      content: "צפייה בהתראות תחזוקה וטיפול בציוד.",
      path: "/sales"
    }
  ];

  return (
    
    <div className="main">
      <section className="articles">
        <div className="container">
          <h1 className="main-page-title"> </h1>
          <div className="articles-container">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                {/* קישור לדף לפי הנתיב שהגדרת */}
                <Link to={article.path} className="article-image-container">
                  <img src={article.image} alt={article.title} className="article-image" />
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
