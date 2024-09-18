import React, { useEffect, useState } from "react";
import useAuth from "../../components/Context/auth-context/AuthContext";
import styles from "../PaginaUsuario/user.module.css";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();// Hook para la navegación entre páginas
  const { usuario } = useAuth(); // Obtenemos la información del usuario desde el contexto de autenticación

  const [user, setUser] = useState({
    telefono: "",
    correo_electronico: "",
    direccion: "",
    nombre_completo: "",
  });
  const uid = usuario?.uid;  // Obtenemos el UID del usuario autenticado

  const getUserData = async () => {
    if (!uid) return;// Si no hay UID, salimos de la función
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${uid}`);
      const data = await response.json();
     


      // Actualizamos el estado con los datos recibidos de la API
      setUser({
        telefono: data.telefono || "",
        correo_electronico: data.correo_electronico || "",
        direccion: data.direccion || "",
        nombre_completo: data.nombre_completo || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
// se ejecuta al cargar el componente o cuando cambia el UID
  useEffect(() => {
    if (uid) {
      getUserData();
    }
  }, [uid]);// Dependencia en el UID para ejecutar el efecto cuando cambie

  return (
    <main className={styles.userMain}>
      <div className={styles.userContainer}>
        <h1 className={styles.titleInfo}> Informacion de usuario</h1>
        <label className={styles.userLabel}>Nombre completo</label>
        <input
          type="text"
          value={user.nombre_completo}
          className={styles.userInput}
          readOnly
        ></input>
        <label className={styles.userLabel}>Dirección</label>
        <input
          type="text"
          value={user.direccion}
          className={styles.userInput}
          readOnly
        ></input>
        <label className={styles.userLabel}>Teléfono</label>
        <input
          type="number"
          value={user.telefono}
          className={styles.userInput}
          readOnly
        ></input>
        <label className={styles.userLabel}>Correo electrónico</label>
        <input
          type="text"
          value={user.correo_electronico}
          className={styles.userInput}
          readOnly
        ></input>

        <button className={styles.buttonAtras}
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Atrás
      </button>
      </div>
    </main>
  );
};
