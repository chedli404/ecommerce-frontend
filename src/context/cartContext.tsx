import React,{ createContext, useContext, useEffect,useState } from 'react';
import useAuth from '../utils/useAuth';
import { getCart } from '../api/cart';



const cartContext = createContext<any>(undefined)

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<{ _id: number; items: any[] } | null>(null);
    const { authInfo } = useAuth();

    useEffect(() => {
        async function fetchCart() {
            if (authInfo?._id) {
                const data = await getCart(authInfo?._id);
                setCart(data);
            }
        }
        fetchCart();
    }, [authInfo]);



    return (
        <cartContext.Provider value={[cart, setCart]}>
            {children}
        </cartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(cartContext);
}

export default CartContextProvider;
