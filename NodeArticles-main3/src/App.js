import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './components/MyRoutes';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
