import { useState } from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/main/Home'
import CreateLR from './components/pages/LR/CreateLR'
import {CreateChallan, TotalLR , Pending} from './components/pages/Index'
import Customer from './components/pages/customers/Customers'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LR from './components/pages/LR/LR'
import Accounts from './components/pages/accounts/Accounts'
import Driver from  './components/pages/D&V/Driver';
import Vehicles from './components/pages/D&V/Vehicles'  
import PrintLr from './components/pages/Reciepts/PrintLr'
import { LrProvider } from './LrContext';
import './App.css';
import Receipt from './components/pages/Reciepts/Receipt'
import ReceiptDetail from './components/pages/Reciepts/ReceiptDetail'
import Fuels from './components/fuels/Fuels'

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
         
          <Route path='/totallrs' element={<TotalLR/>}/>
          <Route path='/customers' element={<Customer/>}/>
          <Route path='/pendinglrs' element={<Pending/>}/>
          <Route path='/lr' element={<LR/>}/>
          <Route path='/accounts' element={<Accounts/>}/>
          <Route path='/vehicle' element={<Vehicles/>}/>
         

          <Route path='/printlr' element={ <PrintLr/>} />
 
          <Route path='/drivers' element={<Driver/>}/>
          <Route path='/receipt' element={<Receipt/>}/>
          <Route path="/receipt-detail/:id" element={<ReceiptDetail />} />
          <Route path="/fuels" element={<Fuels />} />

          <Route path='/CreateChallan' element={<CreateChallan/>}/>
        </Routes> 
        
      </BrowserRouter>
      



    </>
  )
}

export default App
