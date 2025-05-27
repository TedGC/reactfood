import { CartContextProvider } from "./store/cartContext.jsx";
import { ProgrssContextProvider } from "./store/progressContext.jsx";
import Header from './components/Header'
import Cart from './components/Cart.jsx'
import Meal from './components/Meal.jsx'





function App() {

  return (

    <ProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Cart />
        <Meal />
      </CartContextProvider>
    </ProgressContextProvider>
  )
}

export default App;
