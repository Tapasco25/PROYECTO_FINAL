import React, { useState } from "react";
import styles from "./register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../fireBase/Credenciales";
// import { auth } from "../firebase"; // Asegúrate de importar tu configuración de Firebase

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      console.log(newUser.uid, newUser.email, name);

      // Enviar datos del nuevo usuario al backend
      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid_usuario: newUser.uid,
          correo_electronico: newUser.email,
          nombre_completo: name,
        }),
      });
      try {
        await fetch("http://localhost:3000/carrito", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_usuario: newUser.uid,
            id_producto: [],
          }),
        });
      } catch (error) {
        console.error("Error al crear el carrito", error);
      }
      console.log("Usuario creado con éxito");
      navigate("/app");
    } catch (error) {
      console.error("Error al crear la cuenta", error);
      setError(
        "Hubo un problema al crear la cuenta. Por favor, intente de nuevo."
      );
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.sign_inForm}>
      <label htmlFor="name" className={styles.sign_inLabel}>
        Nombre:
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={styles.sign_inInput}
        required
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
        required
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
        required
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
        required
      />
      <br />
      {error && <p className={styles.sign_inError}>{error}</p>}
      <button type="submit" className={styles.sign_inButton}>
        SIGN UP
      </button>
    </form>
  );
};

export default RegisterForm;
