import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext)
    const [places, setPlaces] = useState([])
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch('/places')
            .then(r => r.json())
            .then(data => setPlaces(data));
     
    
        
    }, [])

    useEffect(()=>{
        fetch('/trips')
        .then(r => r.json())
        .then(data => setTrips(data));

    }, [])
    let visitedCount = places.filter(place => place.visited === true).length
    let dreamedCount = places.filter(place => place.visited === false).length
    let takenCount = trips.filter(trip => trip.taken === true).length
    let plannedCount = trips.filter(trip => trip.taken === false).length




    return (
        <div>
            <div>
                <h6>Places Visited:{visitedCount} </h6>
                <h6>Dream Places:{dreamedCount} </h6>
                <Link to="/places/collection">
                <button>See All</button>
                </Link>
                <Link to="/places/new">
                <button>Add</button> 
                </Link> {/* params*/}
                
                
            </div>
            <div>
                <h6>Trips Taken:{takenCount} </h6>
                <h6>Trips Planned:{plannedCount} </h6>
                <button>Gallery</button>
                <Link to="/trips/collection">
                <button>See All</button>
                </Link>
                <button>Add</button>
            </div>



        </div>
    )
}
