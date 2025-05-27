import CartContext from "./store/cartContext";






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
