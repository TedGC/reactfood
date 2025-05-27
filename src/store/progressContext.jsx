import { useState, createContext } from 'react'
import { CartContextProvider } from './cartContext'


const ProgressContext = createContext({
    progress: '',
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { }
})


export function ProgrssContextProvider({ children }) {

    const [userProgress, setUserProgress] = useState('')

    function showCart() {
        setUserProgress('cart')
    }

    function hideCart() {
        setUserProgress('')
    }

    function showCheckout() {
        setUserProgress('checkout')
    }

    function hideCheckout() {
        setUserProgress('')
    }


    const progressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }
    return (

        <CartContextProvider value={progressCtx}>
            {children}
        </CartContextProvider>
    )
}


export default ProgressContext