### FILE: src/pages/NotFound.jsx
import React from 'react';
import Header from '../components/Header.jsx';

const NotFound = () => {
  return (
    <div style={{fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem'}}>
      <Header />
      <main style={{marginTop: '2rem'}}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/" style={{display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px'}}>Go to Home</a>
      </main>
    </div>
  );
};

export default NotFound;