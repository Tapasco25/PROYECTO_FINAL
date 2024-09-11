import React, { useEffect } from "react";
import RegisterForm from "../../components/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fireBase/Credenciales";
import { useNavigate } from "react-router-dom";

export const RegistePage = () => {

  return (
    <>
      <RegisterForm />
    </>
  );
};
