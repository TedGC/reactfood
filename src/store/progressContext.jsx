import { useState, createContext } from 'react'


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

    function 
}





export default ProgressContext