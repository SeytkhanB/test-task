
import {useState} from 'react'

export default function Cities({city}) {
  const [cityPriceState, setCityPriceState] = useState('')

  return (
    <div className='cities'>
      <div className='city'>
        <h3>{city.name}</h3>
        <input 
          type="text" 
          placeholder='5000' 
          value={cityPriceState}
          onChange={e => setCityPriceState(e.target.value)}
        />
      </div>
      <hr />
    </div>
  )
}