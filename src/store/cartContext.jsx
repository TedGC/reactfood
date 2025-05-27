import { createContext, useReducer } from 'react'

const CartContext = createContext(
    {
        items: [],
        addItem: (item) => { },
        removeItem: (id) => { },
        clearItem: () => { }
    }
)

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const updatedItems = [...state.items]
        const existingItem = state.items[existingItemIndex]

        if (existingItemIndex > -1) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingItemIndex] = updatedItem
        }
        else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }
        return { ...state, items: updatedItems }
    }
    if (action.type === 'REMOVE') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id)
        const updatedItems = [...state.items]
        const existingItem = state.items[existingItemIndex]

        if (existingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1)
        }
        else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }
            updatedItems[existingItemIndex] = updatedItem
        }
        return { ...state, items: updatedItems }
    }

    if (action.type === 'CLEAR') {
        return { ...state, items: [] }
    }

    return state
}


export function CartContextProvider({ children }) {


    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

    function addItem(item) {
        dispatchCartAction({ type: 'ADD' }, item)
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE' }, id)
    }

    function clearItem() {
        dispatchCartAction({ type: 'CLEAR' })
    }

    const ctxValue = {
        items: cart.items,
        addItem,
        removeItem,
        clearItem
    }

    return (
        <CartContextProvider value={ctxValue}>
            {children}
        </CartContextProvider>
    )
}

export default CartContext