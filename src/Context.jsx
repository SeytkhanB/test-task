
import {createContext, useEffect, useState} from "react";

// I give an empty string to avoid an error
const Context = createContext('');

function ContextProvider(props) {
  const [storeDataState, setStoreDateState] = useState(JSON.parse(localStorage.getItem('products')) || [])
  // console.log('this is storeDataState in Context.js', storeDataState)

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(storeDataState))
  }, [storeDataState])

  function storeProduct(product) {
    setStoreDateState(prevState => {
      return [
        ...prevState,
        product
      ]
    })
  }

  function storeEditedProduct(editedProduct) {
    const newState = storeDataState.map(product => {
      if (product.id === editedProduct.id) {
        return {...editedProduct}
      }
      return product
    })
    setStoreDateState(newState)
  }

  function removeProductFromContext(id) {
    setStoreDateState(prevState => prevState.filter(product => product.id !== id))
  }

  function removeAllProductsFromContext() {
    setStoreDateState([])
  }

  return (
    <Context.Provider 
      value={{
        storeProduct,
        storeDataState,
        removeProductFromContext,
        removeAllProductsFromContext,
        storeEditedProduct
      }}
    > 
      {props.children}
    </Context.Provider>
  )
}
export {ContextProvider, Context}