import { useState } from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/main/Home'
import {CreateChallan, CreateLR , TotalLR} from './components/pages/Index'
// import {CreateLR, CreateChallan, ExpieryBills, Pending, Vehicles, Total, RahulTransports} from './components/pages'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LorryReceipt from './components/pages/Reciepts/ReceiptsLorry'



function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/home' element={ <Home/>} />
          <Route path='/dashboard' element={ <Home/>} />
          <Route path='/createLR' element={ <CreateLR/>} />
          <Route path='/receipts' element={ <LorryReceipt/>} />
          <Route path='/totallrs' element={<TotalLR/>}/>
          {/* <Route path='/CreateChallan' element={<CreateChallan/>}/> */}
        </Routes> 
      </BrowserRouter>



    </>
  )
}

export default App
