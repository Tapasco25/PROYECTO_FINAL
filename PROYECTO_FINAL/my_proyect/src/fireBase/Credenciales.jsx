// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyCfuWe7fCZCgYHh3TJXYvunOFjIhA_ml2o",
  authDomain: "proyectofinal-23d43.firebaseapp.com",
  projectId: "proyectofinal-23d43",
  storageBucket: "proyectofinal-23d43.appspot.com",
  messagingSenderId: "803290047510",
  appId: "1:803290047510:web:4f7244b9daf4d6d36b4137",
  measurementId: "G-Q0B29X46LX"
};

// Inicializa la aplicación de Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);
// Obtiene el servicio de autenticación de Firebase
const auth = getAuth(app);

export {auth,app}