import React, { useMemo, useState } from 'react'
import { GiShoppingCart } from 'react-icons/gi'
import styles from './Cart.module.css'
import { getCartProducts } from '../../utils/localStorage'

const Cart = ({ productsInCart }) => {

    return (
        <button className={styles.button_cart}>

            <GiShoppingCart size={30} />
            <p className={styles.products_in_cart}>
                {productsInCart.reduce(
                    (accumulator, prod) => accumulator + prod.quantity,
                    0,
                )}
            </p>

        </button>
    )
}

export default Cart