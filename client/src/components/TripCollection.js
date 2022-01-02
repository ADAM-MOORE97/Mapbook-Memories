import React, {useState, useEffect, useContext, useRef} from 'react'
import { UserContext } from '../context/user';
import TripCard from './TripCard';

export default function TripCollection() {
    const [tripData, setTripData] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([])
    const { user, setUser } = useContext(UserContext)
  
  
    function handleChange(e) {
      let filteredData = tripData.filter((trip) => trip.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilteredTrips(filteredData)
  
    }
    function handleSubmit(e) {
      e.preventDefault()
  
  
    }

    useEffect(() => {
     
      fetch('/trips')
        .then(r => r.json())
        .then(data => {
          console.log(data)
          setTripData(data)
          setFilteredTrips(data)
        })

  
    }, [] );
  
    return (
        <div>
            {filteredTrips.map((trip)=>{
                return <TripCard key={trip.id} trip={trip}/>
            })}
            
        </div>
    )
}
