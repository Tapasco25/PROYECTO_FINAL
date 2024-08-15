import React, { useState } from 'react';
import styles from './login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el inicio de sesión con email y password
    console.log('Iniciando sesión con', email, password);
  };

  const handleGoogleLogin = () => {
    // Redirigir a la página de inicio de sesión de Google
    window.location.href = 'https://accounts.google.com/signin/v2/identifier';
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>SIGN IN</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          SIGN IN
        </button>
      </form>
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        SIGN IN WITH GOOGLE
      </button>
    </div>
  );
}

export default Login;
