import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TripCard({trip}) {
const navigate = useNavigate()
 
   
    return (
        <div>
            <h2>{trip.name}</h2>
            <h6>Start Date: {trip.start_date} End Date: {trip.end_date}</h6>
            <p>Status: {trip.taken? 'Taken' : 'Planned'}</p>
            <button onClick={()=>{navigate(`/trips/${trip.id}`)}}>Full Details</button>
        </div>
    )
}
