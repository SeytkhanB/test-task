
import Cities from './Cities'
import cityData from '../../server/cityData'

export default function AddPrice(props) {

  const cities = cityData.map(city => (
    <Cities key={city.id} city={city} />
  ))

  return (
    <div className='add-price'>
      <h3>Price</h3>

      <div className='add-price-inputs'>
        <input
          id="forAllPrice"
          type="checkbox"
          name="checkboxState"
          onChange={props.addPriceState}
          checked={props.state.checkboxState}
        />
        <label htmlFor="forAllPrice">One price for all cities</label>

        <input
          style={{marginLeft: '5%'}} 
          type="text"
          name='priceState'
          value={props.state.priceState}
          placeholder='5000'
          onChange={props.addPriceState}
        />
      </div>

      {
        !props.state.checkboxState &&
        cities
      }
    </div>
  )
}