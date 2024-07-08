export default async function Get_products() {
    const products = await fetch("https://fakestoreapi.com/products");
    const AllProducts = await products.json()
  
    return AllProducts
  }