import React from 'react'
import { Link } from 'react-router-dom';

export default function TripDash({tripData}) {
    let takenCount = tripData ? tripData.filter(trip => trip.taken === true).length : null
    let plannedCount = tripData ? tripData.filter(trip => trip.taken === false).length : null
    return (
        <div>
            <h6>Trips Taken:{takenCount} </h6>
            <h6>Trips Planned:{plannedCount} </h6>
            <button>Gallery</button>
            <Link to="/trips/collection">
                <button>See All</button>
            </Link>
            <Link to='/trips/new'>
            <button>Add</button>
            </Link>
        </div>
    )
}
