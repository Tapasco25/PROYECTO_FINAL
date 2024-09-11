import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../fireBase/Credenciales";

// Crear el contexto para la autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  // useEffect para detectar el cambio en el estado de autenticación del usuario
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUsuario(currentUser); // Actualiza el estado del usuario cuando hay un cambio
    });
  }, []);
// Comparte la información del usuario con todos los componentes que estén dentro del AuthProvider
  return (
    <AuthContext.Provider value={{ usuario}}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
