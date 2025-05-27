import






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
