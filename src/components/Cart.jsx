import { useContext } from "react";
import CartContext from "../store/cartContext";
import ProgressContext from "../store/progressContext";
import { currencyFormatter } from "../util/currencyFormatter";



export default function Cart() {

    const cartCtx = useContext(CartContext)
    const progressCtx = useContext(ProgressContext)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) =>
        totalPrice + item.quantity * item.price
    )

    function handleCartClose() {
        progressCtx.hideCart()
    }

    function handleShowCheckout() {
        progressCtx.showCheckout()
    }

    return (
        <Modal
            open={progressCtx.progress === 'cart'}
            onClose={progressCtx.progress === 'cart' ? handleCartClose : null}
        >
            <h2> your cart</h2>
            <ul>
                {cartCtx.items.map((item) => {
                    <CartItem
                        key={item.id}
                        price={item.price}
                        name={item.name}
                        onDecrease={() => { cartCtx.removeItem(id) }}
                        onIncrease={() => { cartCtx.addItem(item) }}
                    />
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCartClose}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleShowCheckout}>
                        proceed to checkout
                    </Button>
                )}
            </p>

        </Modal>
    )

}





