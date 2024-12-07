import { useState } from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/main/Home'
import {CreateChallan, CreateLR} from './components/pages/Index'
// import {CreateLR, CreateChallan, ExpieryBills, Pending, Vehicles, Total, RahulTransports} from './components/pages'
import {BrowserRouter,Routes,Route} from 'react-router-dom'



function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/home' element={ <Home/>} />
          <Route path='/CreateLR' element={ <CreateLR/>} />
          {/* <Route path='/CreateChallan' element={<CreateChallan/>}/> */}
        </Routes> 
      </BrowserRouter>



    </>
  )
}

export default App
