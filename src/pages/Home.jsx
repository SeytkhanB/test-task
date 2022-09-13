
import React from 'react'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div className='home-page'>
      <h1>
        Welcome to my test task app.
      </h1>

      <Link className='link-products' to='/products'>Products</Link>

      {/* JUST THOUGHTS */}
      {/* <Link className='link-create' to='/create/'>Add product</Link>
      <Link className='link-edit' to='/edit'>Edit</Link> */}
    </div>
  )
}