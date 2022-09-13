
import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context'

export default function Product(props) {
  const [trashHovered, setTrashHovered] = useState(false)
  const [editHovered, setEditHovered] = useState(false)

  const {removeProductFromContext} = useContext(Context)

  // deletes product from "Products" and "Context" states.
  // cause pagination
  function removeProductFromBothStates() {
    removeProductFromContext(props.product.id)
    props.removeProduct(props.product.id)
  }

  const trashIconClassName = trashHovered ? 'ri-delete-bin-fill' : 'ri-delete-bin-line'
  const editIconClassName = editHovered ? 'ri-pencil-fill' : 'ri-pencil-line'


  return (
    <div>
      <div>
        <ul className='products-info'>
          <div 
            style={{
              display: 'flex', 
              alignItems: 'center',
            }}
          >
            <i 
              className={trashIconClassName}
              onMouseEnter={() => setTrashHovered(true)}
              onMouseLeave={() => setTrashHovered(false)}

              onClick={removeProductFromBothStates}
            ></i>

            <Link
              style={{
                color: '#333',
                textDecoration: 'none'
              }}
              to={`/products/edit/${props.product.id}`}
            >
              <li 
                className={editIconClassName}
                onMouseEnter={() => setEditHovered(true)}
                onMouseLeave={() => setEditHovered(false)}
                style={{cursor: 'pointer'}}
              ></li>
            </Link>
          </div>
          <li>
            <img
              style={{width: '100px'}} 
              src={props.product.img.item} 
              alt=""
            />

          </li>
          <li className='active'>{props.product.name}</li>
          <li 
            className={
              props.product.status === 'active' ?
              'active-status' : 'archieve-status'}
          >
            {props.product.status}
          </li>
          <li className='active'>{props.product.price}</li>
        </ul>
        <hr />
      </div>
    </div>
  )
}