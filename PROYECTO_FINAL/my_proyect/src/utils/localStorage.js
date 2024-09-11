export const CART = 'CART';// Clave para el carrito en el almacenamiento local

// Obtiene los productos del carrito
export function getCartProducts() {
    // Devuelve los productos o una lista vacía si no hay
    return JSON.parse(localStorage.getItem(CART) ?? '[]')
}
// Guarda los productos del carrito
export function setCartProducts(products) {
       // Convierte los productos a texto y los guarda
    localStorage.setItem(CART, JSON.stringify([...products]))
}