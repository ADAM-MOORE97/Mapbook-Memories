import React from 'react'
import PlaceCollection from './PlaceCollection'

export default function PlaceCard({place}) {
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
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{place.description}</p>
      </div>
    </div>
    )
}
