import React from 'react'
import Check from '../Components/Check'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Userbooking from '../Components/Userbooking'
import Driverbooking from '../Components/Driverbooking'

const Landingpage = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/Signup" element={<SignUp />}> </Route>
            <Route path="/Userbooking" element={<Userbooking/>}></Route>
            <Route path="/Driverbooking" element={<Driverbooking/>}></Route>
           
        </Routes>
        </BrowserRouter>
        

    </div>
  )
}

export default Landingpage