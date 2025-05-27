import { useContext } from "react"
import CartContext from "../store/cartContext.jsx"
import ProgressContext from "../store/progressContext.jsx"
import { currencyFormatter } from "../util/currencyFormatter.jsx"




export default function Cart() {

    const cartCtx = useContext(CartContext)
    const progressCtx = useContext(ProgressContext)

    const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    })

    function handleHideCart() {
        progressCtx.hideCart()
    }

    function handleCheckout() {
        progressCtx.showCheckout()
    }

    return (

        <Modal
            className='cart'
            open={progressCtx.progress === 'cart'}
            onClose={progressCtx.progess === 'cart' ? handleShowCart : null}
        >
            <h2> cart</h2>
            <ul>
                {cartCtx.items.map(item => {
                    <CartItem
                        key={item.id}
                        price={item.price}
                        name={item.name}
                        onIncreas={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(id)}

                    />
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>
                    Close
                </Button>
                {cartCtx.items.length > 0 &&
                    <Button onClick={handleCheckout}>
                        Checkout
                    </Button>}
            </p>
        </Modal>
    )
}