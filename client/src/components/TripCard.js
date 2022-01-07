import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TripCard({trip}) {
const navigate = useNavigate()
 
   
    return (
        // <div>
        //     <h2>{trip.name}</h2>
        //     <h6>Start Date: {trip.start_date} End Date: {trip.end_date}</h6>
        //     <p>Status: {trip.taken? 'Taken' : 'Planned'}</p>
        //     <button onClick={()=>{navigate(`/trips/${trip.id}`)}}>Full Details</button>
        // </div>
        <div

      className="card border-dark m-3 blogcard"
    >
      <div className="card-header ">

        <div className="d-inline-block ms-3">
          <h5 className="card-title">{trip.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
          Start Date: {trip.start_date} End Date: {trip.end_date}
          </h6>
          <p>Status: {trip.taken? 'Taken' : 'Planned'}</p>
        </div>
      </div>
      <div className="card-body">
        <button className='btn btn-dark' onClick={() => { navigate(`/trips/${trip.id}`) }}>Full Details</button>
      </div>
    </div>
    )
}
