
import React, { useEffect, useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import {Context} from '../../Context'

import {Link} from 'react-router-dom'
import Product from './Product'
import Search from '../Search';

export default function Products() {

  // it is all for pagination 
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);


  
  const {
    storeDataState,
    removeAllProductsFromContext
  } = useContext(Context)

  const itemsPerPage = 5
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(storeDataState.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(storeDataState.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % storeDataState.length;
    setItemOffset(newOffset);
  };


  function removeProduct(id) {
    setCurrentItems(prevState => prevState.filter(product => product.id !== id))
  }

  function removeAll() {
    setCurrentItems([])
    removeAllProductsFromContext()
  }


  const products = currentItems.map(product => (
    <Product 
      key={product.id} 
      product={product}
      removeProduct={removeProduct}
    />
  ))

  return (
    <div className='products-page'>
      <header className="products-header">
        <h3>Products {currentItems.length}</h3>

        <Link className='link-add' to='/products/add'>Add</Link>
      </header>

      <div className='products-showing'>
        <Search />

        <div className='products'>
          <div>
            <ul className='products-info'>
              <li 
                onClick={removeAll}
                style={{cursor: 'pointer'}}
              >
                <h3>Delete all</h3>
              </li>
              <li><h3>img</h3></li>
              <li><h3>Name</h3></li>
              <li><h3>Status</h3></li>
              <li><h3>Price</h3></li>
            </ul>
          </div>
        </div>

        {products}
      </div>

      {
        storeDataState.length > 0 && 
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}

          activeClassName={'active'}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
        />
      }
    </div>
  )
}