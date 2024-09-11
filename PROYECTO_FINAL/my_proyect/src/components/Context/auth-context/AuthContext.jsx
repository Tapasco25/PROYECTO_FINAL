import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../fireBase/Credenciales";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUsuario(currentUser); // Actualiza el estado del usuario cuando hay un cambio
    });
  }, []);

  return (
    <AuthContext.Provider value={{ usuario }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
