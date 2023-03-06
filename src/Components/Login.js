import React, { useState } from 'react'
import axios from "axios"
import "./login.css"
import {useNavigate} from "react-router-dom"
const Login = () => {
    const[name,setName]=useState(null)
    const[password,setPassword]=useState(null)
    const navigate=useNavigate()
    function handleSubmit(event){
        
        userlogin(name,password)
        
        event.preventDefault()
    }
    async function userlogin(un,up)
    {   var body={
        name:un,
        password:up
    }
    try {
        var token=await axios.post("http://localhost:8000/Taxibooking/login",body)
        console.log(token)
        var tok=token.data[0]
        var userrole=token.data[1]
        
        sessionStorage.setItem("jwto",tok)
        if(userrole=="user"){
            navigate("/Userbooking")
        }
        if(userrole=="driver")
        {
            navigate("/Driverbooking")
        }
        //console.log(tok)
    } catch (error) {
        window.alert("wrong password")
        console.log(error)
    }
        


    }
  return (
    <div>
      <div className='login-form'>
    <div className="login-header">
    <h3>Welcome to Taxibooking App!</h3>
    </div>
    <div className='login-body'>
      <form onSubmit={(event)=>handleSubmit(event)}>
    <div className="row mb-3">
      <label  className="col-sm-10 col-form-label">Name:<div className="col-sm-10">
        <input type="text" className="form-control"  onChange={(event)=>{setName(event.target.value)}}></input>
      </div></label>
      
    </div>
    <div className="row mb-3">
      <label className="col-sm-10 col-form-label">Password:<div className="col-sm-10">
        <input type="password" className="form-control" id="inputPassword3" onChange={(event)=>{setPassword(event.target.value)}}></input>
      </div> </label>
      
    </div>
    
   
    <button type="submit" className="btn btn-primary m-2">Log in</button>
    <button type="button" className="btn btn-primary m-2" onClick={()=>navigate("/Signup")}>Sign Up</button>
  </form>
    </div>
    </div>
    </div>
  )
}

export default Login