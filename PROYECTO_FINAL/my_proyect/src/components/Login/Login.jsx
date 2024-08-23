import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [registrar, setRegistrar] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser ? "Usuario encontrado" : "Usuario no encontrado");
    });

    return () => unsubscribe(); // Limpia el efecto para evitar fugas de memoria
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Creando usuario...");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Enviar datos del nuevo usuario al backend
      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid_usuario: newUser.uid,
          correo_electronico: newUser.email,
        }),
      });

      console.log("Usuario creado con éxito");
    } catch (error) {
      console.error("Error al crear la cuenta", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Iniciando sesión...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Has iniciado sesión");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const submitHandler = (e) => {
    registrar ? handleRegister(e) : handleLogin(e);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Has iniciado sesión con Google");
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };

  return (
    <>
      {!user && (
        <div className={styles.loginContainer}>
          <form onSubmit={submitHandler} className={styles.loginForm}>
            <h2>{registrar ? "SIGN UP" : "SIGN IN"}</h2>
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
              {registrar ? "SIGN UP" : "SIGN IN"}
            </button>
          </form>
          <button
            onClick={() => setRegistrar(!registrar)}
            className={styles.buttonIniciar}
          >
            {registrar ? "¿DO YOU WANT TO START?" : "¿DO YOU WANT TO REGISTER?"}
          </button>
          <button onClick={handleGoogleLogin} className={styles.googleButton}>
            SIGN IN WITH GOOGLE
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
