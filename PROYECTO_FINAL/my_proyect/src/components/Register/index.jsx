import React, { useState } from "react";
import styles from "./register.module.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    fetch("(link unavailable)", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.sign_inForm}>
      <label htmlFor="name" className={styles.sign_inLabel}>
        Nombre:
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={styles.sign_inInput}
      />
      <br />
      <label htmlFor="surname" className={styles.sign_inLabel}>
        Apellido:
      </label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(event) => setSurname(event.target.value)}
        className={styles.sign_inInput}
      />
      <br />
      <label htmlFor="email" className={styles.sign_inLabel}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={styles.sign_inInput}
      />
      <br />
      <label htmlFor="password" className={styles.sign_inLabel}>
        Contraseña:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className={styles.sign_inInput}
      />
      <br />
      <label htmlFor="confirm-password" className={styles.sign_inLabel}>
        Confirmar Contraseña:
      </label>
      <input
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        className={styles.sign_inInput}
      />
      <br />
      {error && <p className={styles.sign_in - error}>{error}</p>}
      <button type="submit" className={styles.sign_inButton}>
        SIGN UP
      </button>
    </form>
  );
};

export default RegisterForm;
