import React, { useState } from "react";
import styles from "./register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../fireBase/Credenciales";

const RegisterForm = () => {
  // Estados para guardar la información del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redirigir después del registro

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    // Verifica si todos los campos están llenos
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !telefono ||
      !direccion === ""
    ) {
      setError("Todos los campos son obligatorios.");
      return; // Detiene la ejecución si falta algún campo
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      // Registrar al usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user; // Obtiene los datos del nuevo usuario
      console.log(newUser.uid, newUser.email, name);

      // Enviar datos del nuevo usuario al backend
      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid_usuario: newUser.uid,
          correo_electronico: newUser.email,
          nombre_completo: name,
          telefono: telefono,
          direccion: direccion,
        }),
      });
      // Crea un carrito vacío para el nuevo usuario
      try {
        await fetch("http://localhost:3000/carrito", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_usuario: newUser.uid,
            id_producto: [],
          }),
        });
        navigate("/app");
      } catch (error) {
        console.error("Error al crear el carrito", error);
      }
      console.log("Usuario creado con éxito");
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
        Nombre completo:
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
      <label htmlFor="telefono" className={styles.sign_inLabel}>
        Teléfono:
      </label>
      <input
        type="text"
        id="telefono"
        value={telefono}
        onChange={(event) => setTelefono(event.target.value)}
        className={styles.sign_inInput}
        required
      />
      <br />
      <label htmlFor="direccion" className={styles.sign_inLabel}>
        Dirección:
      </label>
      <input
        type="text"
        id="direccion"
        value={direccion}
        onChange={(event) => setDireccion(event.target.value)}
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
