import { useContext } from "react"
import CartContext from "../store/cartContext.jsx"
import ProgressContext from "../store/progressContext.jsx"
import Button from '../UI/Button.jsx'
import logoImg from '../assets/logo.jpg'

export default function Header() {

    const cartCtx = useContext(CartContext)
    const progressCtx = useContext(ProgressContext)

    const totalNumberOfItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    })

    function handleShowCart() {
        progressCtx.showCart()
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt='logo image' />
                <h1>ReactFood/h1</h1>

            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalNumberOfItems})
                </Button>
            </nav>
        </header>

    )
}