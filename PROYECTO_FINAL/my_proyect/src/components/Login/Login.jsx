import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";
import RegisterForm from "../Register/index";
import { useNavigate } from "react-router-dom";

function Login() {
  // Estado para almacenar el email y la contraseña del usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // Estado para almacenar el usuario autenticado
  const [user, setUser] = useState(null);
    // Estado para alternar entre el formulario de inicio de sesión y registro
  const [registrar, setRegistrar] = useState(false);
    // Estado para manejar mensajes de error
  const [error, setError] = useState("");
  const navigate = useNavigate();// Hook para redireccionar después del login

  useEffect(() => {
    // Configura un listener para el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);
 // Maneja el inicio de sesión con email y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();// Evita el comportamiento por defecto del formulario
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Has iniciado sesión");
      navigate("/app");// Redirecciona al usuario a la página principal de la aplicación
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setError("Error al iniciar sesión. Por favor, revisa tus credenciales.");
    }
  };
// Maneja el registro de un nuevo usuario (aún no registrado)
  const handleRegister = async (e) => {
    e.preventDefault();// Evita el comportamiento por defecto del formulario
    console.log("Registrando usuario...");
    // Llama a la función de registro de usuario si es necesario
  };
 // Maneja el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Has iniciado sesión con Google");
      navigate("/app");
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
      setError(
        "Error al iniciar sesión con Google. Por favor, inténtalo de nuevo."
      );
    }
  };
 // Alterna entre el registro y el inicio de sesión en función del estado `registrar`
  const submitHandler = (e) => {
    registrar ? handleRegister(e) : handleLogin(e);
  };

  return (
    <div className={styles.loginContainer}>
      {/* {!user && ( */}

      {registrar ? (
        <RegisterForm />
      ) : (
        <form onSubmit={submitHandler} className={styles.loginForm}>
          <h2>SIGN IN</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}// Actualiza el estado de `email` al cambiar el input
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}// Actualiza el estado de `password` al cambiar el input
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>} {/* Muestra el mensaje de error si existe */}
          <button type="submit" className={styles.loginButton}>
            SIGN IN
          </button>
        </form>
      )}
      <button
        onClick={() => setRegistrar(!registrar)} // Alterna el estado de `registrar` al hacer clic
        className={styles.buttonIniciar}
      >
        {registrar ? "¿DO YOU WANT TO START?" : "¿DO YOU WANT TO REGISTER?"}
      </button>
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        SIGN IN WITH GOOGLE
      </button>
      {/* )} */}
    </div>
  );
}

export default Login;
