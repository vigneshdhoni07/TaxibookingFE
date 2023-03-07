import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

import "./driverbooking.css"
const Driverbooking = () => {
    const[place,setPlace]=useState("")
    const[allrides,setAllrides]=useState(null)
    const[price,setPrice]=useState(null)
    const[pickuptime,setPickuptime]=useState(null)
    const[bookingavail,setBookingavail]=useState(null)
    const navigate=useNavigate()
    function logout()
    {
        sessionStorage.clear()
        navigate("/")
    }
   function submithandle(event)
    {
        event.preventDefault()
        
        getrides(place)

    }
    var tok=sessionStorage.getItem("jwto")
    async function acceptride(price,pickuptime,bid)
    {
        var obj={
            pickuptime:pickuptime,
            price:price
        }
        try {
            var updatedride=await axios.patch(`http://localhost:8000/Taxibooking/Driverreq/${bid}`,obj,{headers:{
                "x-token":tok
            }})
            console.log(updatedride)
            
        } catch (error) {
            console.log(error)
        }
        window.alert("Ride Booked")
    }
    
    async function getrides(place)
    {   try{
        var bookings=await axios.get(`http://localhost:8000/Taxibooking/Bookingbyplace/${place}`,{headers:{
            "x-token":tok
        }})
        if(bookings.data.length)
        {
            setAllrides(bookings.data)
            setBookingavail(null)
            
        }
        else{
            setAllrides(null)
            setBookingavail(1)
        }
        
        console.log(bookings.data)
    }
    catch(err)
    {
        console.log(err)
    }
       
    }
  return (
      <div className='ride-container'>
        <div className='form-container-driver'>
        <div className="form-header-driver">
            <h2>Search for Ride</h2>
        </div>
        <div className='form-body-driver'>

        
          <form onSubmit={(event) => submithandle(event)}>
              <div className="row mb-3">
                  <label className="col-sm-4 col-form-label"><h6>Places:</h6><div className="col-sm-10">
                      <input type="text" className="form-control" onChange={(event) => { setPlace(event.target.value) }}></input>
                  </div></label>

              </div>
              <button type="submit" className="btn btn-primary m-1">Get Details</button>
              <button type="button" className="btn btn-primary m-1" onClick={()=>logout()}>LogOut</button>

          </form>
          <hr></hr>
          <div>
          </div>
              {allrides &&
               <div className='Booking-Container-driver'>
                  <div className='container-fluid'>
                      {allrides.map((e,i) => {
                            
                                
                          return (
                            <div className='row border border-primary bg-light m-2 ' key={i}>
                            <div className='col-2 text-dark '>Origin:{e.origin}</div>
                            <div className='col-3 text-dark '>Destination:{e.destination} </div>
                            <div className='col-2 text-dark '> pickuptime:{e.pickuptime}</div>
                            <div className='col-1 text-dark '><input type="text" placeholder='price' onChange={(event)=>setPrice(event.target.value)}></input></div>
                            <div className='col-2 text-dark '><input type="text" placeholder="pickup-time" onChange={(event)=>setPickuptime(event.target.value)}></input></div>
                            <div className='col-2 text-dark d-flex justify-content-center'><button className="btn btn-primary" onClick={()=>acceptride(price,pickuptime,e._id)}>Book</button></div>
  
  
  
                        </div>
                     )
                      })}
                     

                  </div>
                  </div>}
          </div>
          {bookingavail&&<p>No Rides Available For this Place!</p>}
          </div>
      </div>
  )
}

export default Driverbooking