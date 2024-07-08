import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Get_products from "./components/Get_products";

function App() {
  let [products, setproducts] = useState([]);

  const funcion = async () => {
    const produsct = await Get_products();
    setproducts(produsct);
    // return produsct;
  };

  useEffect(() => {
    // let res =
    funcion();
  }, []);

  return (
    <>
      {products.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <img src={item.image} alt={item.title} />
          </div>
      ))}
      <button
        onClick={() => {
          console.log(products);
        }}
      >
        c
      </button>
    </>
  );
}

export default App;
