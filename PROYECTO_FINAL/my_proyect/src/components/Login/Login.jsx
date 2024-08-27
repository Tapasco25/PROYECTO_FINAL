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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [registrar, setRegistrar] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Has iniciado sesión");
      navigate("/app");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setError("Error al iniciar sesión. Por favor, revisa tus credenciales.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registrando usuario...");
    // Llama a la función de registro de usuario si es necesario
  };

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

  const submitHandler = (e) => {
    registrar ? handleRegister(e) : handleLogin(e);
  };

  return (
    <div className={styles.loginContainer}>
      {!user && (
        <>
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
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.loginButton}>
                SIGN IN
              </button>
            </form>
          )}
          <button
            onClick={() => setRegistrar(!registrar)}
            className={styles.buttonIniciar}
          >
            {registrar ? "¿DO YOU WANT TO START?" : "¿DO YOU WANT TO REGISTER?"}
          </button>
          <button onClick={handleGoogleLogin} className={styles.googleButton}>
            SIGN IN WITH GOOGLE
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
