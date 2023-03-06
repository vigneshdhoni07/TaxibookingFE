import React, { useState } from 'react'


const Check = () => {
    const[origin,setOrigin]=useState(null)
    const[destination,setDestination]=useState(null)
    const[pickuptime,setPickuptime]=useState(null)
    function submithandle(event)
    {
        event.preventDefault()
        window.alert("Origin:"+origin+"Destination:"+destination+"Pickuptime:"+pickuptime)

    }
  return (
    <form onSubmit={(event)=>submithandle(event)}>
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
  
 
  <button type="submit" className="btn btn-primary">Log in</button>
</form>
  )
}

export default Check