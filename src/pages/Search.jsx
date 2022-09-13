
import React, {useEffect, useState, useContext} from 'react'
import { Context } from '../Context'

export default function Search() {
  const [searchInput, setSearchInput] = useState('')
  const [namesState, setNamesState] = useState([]) 

  const {storeDataState} = useContext(Context)

  function handleChange(e) {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    if (searchInput.length > 0) {
      const names = storeDataState.filter(product => {
        return product.name.toLowerCase().match(searchInput.toLowerCase())
      })
  
      setNamesState(names)
    }
  }, [searchInput])


  return (
    <div>
      <input 
        className='products-input' 
        type="text"
        placeholder='Search'
        onChange={handleChange}
        value={searchInput} 
      />

      {
        namesState.length > 0 && searchInput.length > 0 &&
        <div className='search-result-container'>
          {namesState.map(product => {
            return (
              <div key={product.id} className='search-result'>
                <img width='60px' src={product.img.item} alt="" />
                <h4>{product.name}</h4>
                <h4>{product.status}</h4>
                <h4>{product.price}</h4>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}