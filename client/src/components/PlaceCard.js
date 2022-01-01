import React from 'react'
import PlaceCollection from './PlaceCollection'
import { useNavigate } from "react-router-dom";

export default function PlaceCard({place}) {
    const navigate = useNavigate();
    return (
        <div
     
      className="card border-dark m-3 blogcard"
    >
      <div className="card-header ">
          
            <div className="d-inline-block ms-3">
              <h5 className="card-title">{place.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Latitude: {place.latitude} , Longitude: {place.longitude}
              </h6>
              <p>{place.visited? 'Congrats! You\'ve been here': 'Not yet visited'}</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{place.description}</p>
        <button onClick={()=>{navigate(`/places/${place.id}`)}}>Full Details</button>
      </div>
    </div>
    )
}
