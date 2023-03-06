import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Userbooking = () => {
    const[origin,setOrigin]=useState(null)
    const[destination,setDestination]=useState(null)
    const[pickuptime,setPickuptime]=useState(null)
    var obj={}
    var tok=sessionStorage.getItem("jwto")
    const[userride,setUserride]=useState(null)
   
   
    var navigate=useNavigate()
    function logout()
    {
        sessionStorage.clear()
        navigate("/")
    }
    useEffect(()=>{
        async function getuserbooking()
        {
            try{
                var userbooking=await axios.get("http://localhost:8000/Taxibooking/BookingAccept",{headers:{
                    "x-token":tok
                }})
                console.log(userbooking.data[0])
                if(userbooking.data[0].isdriveravailable)
                {
                    setUserride(userbooking.data)
                }
                else{
                    setUserride(null)
                }
            }
          catch(err)
          {
            console.log(err)
          }
        }
        getuserbooking()
    },[])
    
    
    function submithandle(event)
    {
        event.preventDefault()
        
        obj.origin=origin
        obj.destination=destination
        obj.pickuptime=pickuptime
        bookaride(obj)
    }
    
   
    async function bookaride(obj)
    {
        try {
            var ridebook=await axios.post("http://localhost:8000/Taxibooking/Userreq",obj,{headers:{
                "x-token":tok
            }})
            console.log(ridebook)
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div>
    {(userride && <div className="container border border-success">{userride.map((e,i)=>{
        return(
            <div key={i}>
            <div className="row m-2">
                <div className='col-4 m-1'>
                    Origin:<span>{e.origin}</span>
                </div>
            </div>
            <div className="row m-2">
            <div className='col-4 m-1'>
                Destination:<span>{e.destination}</span>
            </div>
            </div>
            <div className="row m-2">
            <div className='col-4 m-1'>
                PickupTime:<span>{e.pickuptime}</span>
            </div>
            </div>
            <div className="row m-2 ">
            <div className='col-4 m-1'>
                Price:<span>{e.price}</span>
            </div>
            </div>
            <div className="row m-2">
            <div className='col-4 m-1'>
                DriverName:<span>{e.drivername}</span>
            </div>
            </div>
            <div className="row m-2">
            <div className='col-4 m-1'>
                <span><button className='m-1'>BookNow</button></span>
                <span><button className='m-1' onClick={()=>logout()}>LogOut</button></span>
            </div>
            </div>
        </div>
            
        )
    })}</div> )||<form onSubmit={(event)=>submithandle(event)}>
    <div className="row mb-3">
      <label  className="col-sm-4 col-form-label">Origin:<div className="col-sm-10">
        <input type="text" className="form-control"  onChange={(event)=>{setOrigin(event.target.value)}}></input>
      </div></label>
      
    </div>
    <div className="row mb-3">
      <label className="col-sm-4 col-form-label">Destination:<div className="col-sm-10">
        <input type="text" className="form-control"  onChange={(event)=>{setDestination(event.target.value)}}></input>
      </div> </label>
      
    </div>
    <div className="row mb-3">
      <label className="col-sm-4 col-form-label">PickupTime:<div className="col-sm-10">
        <input type="text" className="form-control" id="inputPassword3" onChange={(event)=>{setPickuptime(event.target.value)}}></input>
      </div> </label>
      
    </div>
    
   
    <button type="submit" className="btn btn-primary m-1">Book Now</button>
    <button type="button" className="btn btn-primary m-1" onClick={()=>logout()}>LogOut</button>
  </form>}
  </div>
    
  )
}

export default Userbooking