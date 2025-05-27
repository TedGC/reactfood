import { useContext } from "react";
import { currencyFormatter } from "../util/currencyFormatter";
import Button from '../UI/Button.jsx'
import CartContext from "../store/cartContext";




export default function MealItem({ meal }) {

    const cartCtx = useContext(CartContext)

    function handleAddMealToCart() {
        cartCtx.addItem(meal)
    }


    return (
        <li className="">







            <Button></Button>
        </li>



    )
}