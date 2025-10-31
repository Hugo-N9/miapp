import React from 'react';

const Error404 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Página no encontrada</h1>
      <p>Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '48px',
    color: '#FF6347',
  },
};

export default Error404;