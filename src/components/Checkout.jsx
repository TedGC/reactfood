import { useContext } from 'react';

import Modal from './UI/Modal.jsx';
import CartContext from '../store/cartContext.jsx';
import { currencyFormatter } from '../util/currencyFormatter.jsx';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import ProgressContext from '../store/progressContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';



const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function CheckOut() {


    const cartCtx = useContext(CartContext)
    const progressCtx = useContext(progressCtx)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        totalPrice + item.price * item.quantity
    })

    const {
        isLoading: isSending,
        data,
        sendRequest,
        error,
        clearData
    } = useHttp('http://localhost:3000/order', requestConfig)

    function handleClose() {
        progressCtx.hideCheckout()
    }

    function handleFinish() {
        progressCtx.hideCheckout()
        cartCtx.clearItem()
        clearData
    }

    function handleSubmit(event) {

        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries)

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customerData: customerData,
                }
            })
        )
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === 'checkout'}
                onClose={handleFinish}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>
                    We will get back to you with more details via email within the next
                    few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    v
    if (isSending) {
        return (<span> Data is coming right now </span>)
    }

    if (data && !error) {
        return (
            <Modal open={progressCtx.progress === 'checkout'}
                onClose={handleFinish}></Modal>
        )
    }
}



//     return (
//         <Modal open={progressCtx.progress === 'checkout'} onClose={handleClose}>
//             <form onSubmit={handleSubmit}>
//                 <h2>Checkout</h2>
//                 <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

//                 <Input label="Full Name" type="text" id="name" />
//                 <Input label="E-Mail Address" type="email" id="email" />
//                 <Input label="Street" type="text" id="street" />
//                 <div className="control-row">
//                     <Input label="Postal Code" type="text" id="postal-code" />
//                     <Input label="City" type="text" id="city" />
//                 </div>

//                 {error && <Error title="Failed to submit order" message={error} />}

//                 <p className="modal-actions">{action}</p>
//             </form>
//         </Modal>
//     );
// 
