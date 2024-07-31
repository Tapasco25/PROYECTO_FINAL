import React, { useState } from 'react';
import './Register.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    fetch('(link unavailable)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        window.location.href = '/';
      }
    })
    .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="sign_in-form">
      <label htmlFor="name" className="sign_in-label">Nombre:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} className="sign_in-input" />
      <br />
      <label htmlFor="surname" className="sign_in-label">Apellido:</label>
      <input type="text" id="surname" value={surname} onChange={(event) => setSurname(event.target.value)} className="sign_in-input" />
      <br />
      <label htmlFor="email" className="sign_in-label">Email:</label>
      <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="sign_in-input" />
      <br />
      <label htmlFor="password" className="sign_in-label">Contraseña:</label>
      <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="sign_in-input" />
      <br />
      <label htmlFor="confirm-password" className="sign_in-label">Confirmar Contraseña:</label>
      <input type="password" id="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="sign_in-input" />
      <br />
      {error && <p className="sign_in-error">{error}</p>}
      <button type="submit" className="sign_in-button">SIGN IN</button>
    </form>
  );
};

export default RegisterForm;
