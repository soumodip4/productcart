import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from '../Component/Home/Home'
import Cart from '../Component/Cart/Cart'
import SearchAppBar from '../Component/shareModule/Header/Header'

function Rout() {
  return (
    <div>
        <BrowserRouter>
        <SearchAppBar/>
        <Routes>
            <Route path='/'element={<Home/>}/>
            <Route path='/cart'element={<Cart/>}/>

        </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Rout
