import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"


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
      <div>
          <form onSubmit={(event) => submithandle(event)}>
              <div className="row mb-3">
                  <label className="col-sm-4 col-form-label">Places:<div className="col-sm-10">
                      <input type="text" className="form-control" onChange={(event) => { setPlace(event.target.value) }}></input>
                  </div></label>

              </div>
              <button type="submit" className="btn btn-primary m-1">Get Details</button>
              <button type="button" className="btn btn-primary m-1" onClick={()=>logout()}>LogOut</button>

          </form>
          <hr></hr>
          <div>
              {allrides &&

                  <div className='container-fluid'>
                      {allrides.map((e,i) => {
                            
                                
                          return (
                            <div className='row border border-primary bg-light m-2 ' key={i}>
                            <div className='col-2 text-dark'><span>Origin:{e.origin}</span></div>
                            <div className='col-2 text-dark'><span>Destination:{e.destination}</span></div>
                            <div className='col-2 text-dark'><span>pickuptime:{e.pickuptime}</span></div>
                            <div className='col-2 text-dark '><span ><input type="text" placeholder='price' onChange={(event)=>setPrice(event.target.value)}></input></span></div>
                            <div className='col-2 text-dark '><span className="p-1"><input type="text" placeholder="pickup-time" onChange={(event)=>setPickuptime(event.target.value)}></input></span></div>
                            <div className='col-2 text-dark d-flex justify-content-center'><span ><button className="btn btn-primary" onClick={()=>acceptride(price,pickuptime,e._id)}>Book</button></span></div>
  
  
  
                        </div>
                     )
                      })}
                     

                  </div>}
          </div>
          {bookingavail&&<p>No Rides Available For this Place!</p>}
      </div>
  )
}

export default Driverbooking