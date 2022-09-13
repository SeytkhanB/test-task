
import './App.css'
import {Routes, Route} from "react-router-dom"

import Home from './pages/Home'
import Products from './pages/products/Products'
import Add from './pages/add/Add'
import Edit from './pages/edit/Edit'


export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/add' element={<Add />} />
        <Route path='/products/edit/:productId' element={<Edit />} />
      </Routes>
    </div>
  )
}