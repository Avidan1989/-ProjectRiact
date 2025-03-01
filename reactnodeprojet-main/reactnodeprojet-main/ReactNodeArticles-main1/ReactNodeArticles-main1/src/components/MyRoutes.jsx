import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import Footer from './Footer';
import MangerProduct from './MangerProduct';  // הוספת הקומפוננטות החדשות
import Sales from './Sales';
import Reports from './Reports';
import Arrangement from './Arrangement';
import Messege from './Messege';

function MyRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manger-product" element={<MangerProduct />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/arrangement" element={<Arrangement />} />
        <Route path="/messege" element={<Messege />} />
      </Routes>
      <Footer />
    </>
  );
}

export default MyRoutes;
