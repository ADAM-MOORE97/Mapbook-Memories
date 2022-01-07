import React from 'react'
import { Link } from 'react-router-dom';

export default function TripDash({tripData}) {
    let takenCount = tripData ? tripData.filter(trip => trip.taken === true).length : null
    let plannedCount = tripData ? tripData.filter(trip => trip.taken === false).length : null
    return (
        <div className='col-6 mt-5 border'>
            <h6 className='text'>Trips Taken:{takenCount} </h6>
            <h6 className='text'>Trips Planned:{plannedCount} </h6>
            <Link to="/trips/gallery">
            <button className='btn btn-dark m-2'>Gallery</button>
            </Link>
            <Link to="/trips/collection">
                <button className='btn btn-dark m-2'>See All</button>
            </Link>
            <Link to='/trips/new'>
            <button className='btn btn-dark m-2'>Add</button>
            </Link>
        </div>
    )
}
