import React, { createContext, useState, useEffect, useContext } from 'react';
import {UserContext} from './UserContext';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (!currentUser) {
            setCart({});
            return
        };
        const url = `/cart/${currentUser.cartId}`; 

        const fetchCart = async () => {
            try {
                const response = await fetch(url);
                const { data } = await response.json();
                setCart(data);
            } catch (error) {
                console.error("Error fetching cart:", error)
            }
        };
        fetchCart();
    }, [currentUser]);
    const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    
    const addItemToCart = (item, quantity) => {
        const body = JSON.stringify({
            quantity: quantity,
        })
        const options = {
            method:"POST",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body
        }
        fetch(`/cart/${cart._id}/${item._id}`, options)
        .then(response => response.json())
        .then(data => {if(data.status === 201){setCart(data.data)}})
        .catch((error) => console.error(error))
    }
    const replaceCart = (cart) => {
        setCart(cart)
    }
    return (
        <CartContext.Provider value={{cart, setCart, totalItems, addItemToCart, replaceCart}}>
            {children}
        </CartContext.Provider>
    );
};

// Export the context and provider
export default CartProvider;

//Need to add under UsersContext in index.js