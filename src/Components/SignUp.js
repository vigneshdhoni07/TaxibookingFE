import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./signup.css"
const SignUp = () => {
    const navigate=useNavigate()
    const[name,setName]=useState(null)
    const[password,setPassword]=useState(null)
    const[email,setEmail]=useState(null)
    const[role,setRole]=useState("user")
    var obj={}


    function submithandle(event){
        event.preventDefault()
        
        obj.name=name;
        obj.password=password;
        obj.mailId=email;
        obj.role=role;
        usersignup(obj)
        navigate("/")
    }
    
    
    async function usersignup(obj) 
    {
        try {
            var newuser=await axios.post("http://localhost:8000/Taxibooking/Signin",obj)
            console.log(newuser)
        } catch (error) {
            
            console.log(error)
        }
    } 
  return (
    <div>
      <div className='signup-form'>
      <div className='signup-header'>
      <h3>SignUp!</h3>
      </div>
    <div className='signup-body'>
        <form onSubmit={(event)=>submithandle(event)}>
  <div className="row mb-3">
    <label  className="col-sm-8 col-form-label ">Name:<div className="col-sm-12 ">
      <input type="text" className="form-control"  onChange={(event)=>{setName(event.target.value)}}></input>
    </div></label>
    
  </div>
  <div className="row mb-3">
    <label className="col-sm-8 col-form-label ">Password:<div className="col-sm-12 ">
      <input type="password" className="form-control" id="inputPassword3" onChange={(event)=>{setPassword(event.target.value)}}></input>
    </div> </label>
    
  </div>
  <div className="row mb-3">
    <label className="col-sm-8 col-form-label ">Email:<div className="col-sm-12 ">
      <input type="email" className="form-control"  onChange={(event)=>{setEmail(event.target.value)}}></input>
    </div> </label>
    
  </div>
  <div className="col-auto">
    <label className="col-sm-4 col-form-label p-2" >Role:
    <select className="form-select" id="autoSizingSelect" onChange={(event)=>{setRole(event.target.value)}}>
      
      <option value="user">user</option>
      <option value="driver">driver</option>
      
    </select></label>
    <button type="submit" className="btn btn-primary m-2">Sign up</button>
  </div>
 
  
</form>
    </div>
    </div>
    </div>
  )
}

export default SignUp