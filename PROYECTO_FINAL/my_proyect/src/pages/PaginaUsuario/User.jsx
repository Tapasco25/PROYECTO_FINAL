import React, { useEffect, useState } from "react";
import useAuth from "../../components/Context/auth-context/AuthContext";
import styles from "../PaginaUsuario/user.module.css";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [user, setUser] = useState({
    telefono: "",
    correo_electronico: "",
    direccion: "",
    nombre_completo: "",
  });
  const uid = usuario?.uid;

  const getUserData = async () => {
    if (!uid) return;
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${uid}`);
      const data = await response.json();
      // console.log("getUserData desde el fetch", data);

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

  useEffect(() => {
    if (uid) {
      getUserData();
    }
  }, [uid]);

  return (
    <main className={styles.userMain}>
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Atrás
      </button>
      <div className={styles.userContainer}>
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
      </div>
    </main>
  );
};
