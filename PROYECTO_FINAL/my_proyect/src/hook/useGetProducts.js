import { useEffect, useState } from "react";

// Este es un hook personalizado para hacer peticiones a una URL y manejar el estado de la carga de datos
export const useFetch = (url) => {
  const [data, setData] = useState([]); // Estado para almacenar los datos que recibimos
  const [loading, setLoading] = useState(true); // Estado para saber si los datos están cargando
  const [error, setError] = useState(false); // Estado para manejar errores en caso de que algo salga mal

  // Función para obtener los datos de la URL
  async function getData() {
    try {
      const response = await fetch(url); // Hacemos la petición a la URL
      const data = await response.json(); // Convertimos la respuesta a JSON
      setLoading(false); // Actualizamos el estado con los datos recibidos
      setData(data);
    } catch (error) {
      setError(true);
      // console.log(error)
    }
  }
  // useEffect se ejecuta una vez cuando el componente se reenderiza
  useEffect(() => {
    getData();
  }, []); // El array vacío asegura que solo se ejecute una vez
  // Devolvemos los datos, el estado de carga y el estado de error para que el componente que use este hook pueda acceder a ello
  return { data, loading, error };
};
