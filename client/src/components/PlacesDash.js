import React from 'react'
import { Link } from 'react-router-dom';


export default function PlacesDash({placeData}) {
    let visitedCount = placeData? placeData.filter(place => place.visited === true).length : null
    let dreamedCount = placeData? placeData.filter(place => place.visited === false).length : null
    return (

        <div className='col-6 mt-5 border'>
            <h6 className='text'>Places Visited:{visitedCount} </h6>
            <h6 className='text'>Dream Places:{dreamedCount} </h6>
            <Link to="/places/collection">
                <button className='btn btn-dark m-2'>See All</button>
            </Link>
            <Link to="/places/new">
                <button className='btn btn-dark m-2'>Add</button>
            </Link>


        </div>

    )
}
