export const CART = 'CART';


export function getCartProducts() {
    return JSON.parse(localStorage.getItem(CART) ?? '[]')
}

export function setCartProducts(products) {
    localStorage.setItem(CART, JSON.stringify([...products]))
}