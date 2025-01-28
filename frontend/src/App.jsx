import { useState } from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/main/Home'
import CreateLR from './components/pages/LR/CreateLR'
import {CreateChallan, TotalLR , RahulTransport, Pending} from './components/pages/Index'
import Customer from './components/pages/customers/Customers'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LR from './components/pages/LR/LR'
import Accounts from './components/pages/accounts/Accounts'
import Driver from  './components/pages/D&V/Driver';
import Vehicles from './components/pages/D&V/Vehicles'  
import PrintLr from './components/pages/Reciepts/PrintLr'
import './App.css';
import Receipt from './components/pages/Reciepts/Receipt'
import ReceiptDetail from './components/pages/Reciepts/ReceiptDetail'
import Fuels from './components/fuels/Fuels'
import POS from './components/pages/LR/POS'
import UnbilledLR from './components/pages/LR/UnbilledLR'
import BilledLR from './components/pages/LR/BilledLR'
import CreateBill from './components/pages/Billing/CreateBill'
import EmailSender from './components/pages/customers/EmailSender'
import TotalBills from './components/pages/Billing/TotalBills'
import Tracking from './components/fuels/Tracking'
import DailyEntries from './components/pages/accounts/DailyEntries'
import DashboardLayout from './components/main/DashboardLayoutBranding'
import 'semantic-ui-css/semantic.min.css';


function App() {


  return (
    <>
   


    <BrowserRouter>
    <DashboardLayout/>  
        <Routes>


           {/* Login */}
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* Home */}
          <Route path='/dashboard' element={ <DashboardLayout/>} />


          {/* LR */}
      
      
   

          <Route path='/unbilled' element={<UnbilledLR/>}/>
          <Route path='/billdedlrs' element={<BilledLR/>}/>


          {/* Accounts */}
      
          <Route path='/pos'  element={<POS/>}/>
          <Route path = '/dailyentries'  element={<DailyEntries/>}/>

         

          <Route path='/printlr' element={ <PrintLr/>} />
 
          <Route path='/drivers' element={<Driver/>}/>
          <Route path='/receipt' element={<Receipt/>}/>
    

          <Route path='/CreateChallan' element={<CreateChallan/>}/>

    
          <Route path='/createbill'  element={<CreateBill/>}/>
       




          <Route path='/rt'  element={<RahulTransport/>}/>

          <Route path='/totalbills' element={<TotalBills/>} />


       
          
          
        </Routes> 
        
      </BrowserRouter>
      



    </>
  )
}

export default App
