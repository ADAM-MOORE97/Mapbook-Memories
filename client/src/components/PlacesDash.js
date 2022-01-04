import React from 'react'
import { Link } from 'react-router-dom';


export default function PlacesDash({placeData}) {
    let visitedCount = placeData? placeData.filter(place => place.visited === true).length : null
    let dreamedCount = placeData? placeData.filter(place => place.visited === false).length : null
    return (

        <div>
            <h6>Places Visited:{visitedCount} </h6>
            <h6>Dream Places:{dreamedCount} </h6>
            <Link to="/places/collection">
                <button>See All</button>
            </Link>
            <Link to="/places/new">
                <button>Add</button>
            </Link>


        </div>

    )
}
