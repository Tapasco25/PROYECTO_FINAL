import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setData(data);
    } catch (error) {
      setError(true);
      // console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error };
};
