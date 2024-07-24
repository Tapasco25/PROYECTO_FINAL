import React, { useState } from 'react';
import './Login.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('(link unavailable)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        // Autenticación exitosa, redirige al usuario a la página principal
        window.location.href = '/';
      }
    })
    .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email" className="login-label">Email:</label>
      <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="login-input" />
      <br />
      <label htmlFor="password" className="login-label">Contraseña:</label>
      <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="login-input" />
      <br />
      {error && <p className="login-error">{error}</p>}
      <button type="submit" className="login-button">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;