import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import PlaceDetailMap from "./PlaceDetailMap";


export default function PlaceDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [placeDetails, setPlaceDetails] = useState();
    const [showMap, setShowMap] = useState(false)


    useEffect(() => {
        fetch(`/places/${params.id}`)
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((data) => setPlaceDetails(data))
                } else {
                    resp.json().then(data => console.log(data.errors[0]))
                }
            })

    }, [])
    console.log(placeDetails)

    if (!placeDetails) {
        navigate('/')
    }





    function handleEditClick(placeDetails) {
        navigate(`/places/${placeDetails.id}/edit`)
    }
    function handleDeleteClick() {
        const del = window.confirm("Delete Place?");

        if (del === true) {
            fetch(`/places/${params.id}`, {
                method: "DELETE",
            })
                .then(r => r.json())
                .then(data => console.log(data))
                .catch(data => console.log(data.errors))
            navigate('/')

        }
        else { console.log("Delete canceled") }
    }
    ;
console.log(placeDetails)


       if(placeDetails) {
           
        return(<div>
            {showMap? <PlaceDetailMap placeDetails={placeDetails}/> : null}
    <div className="card">
            <div className="card-header">
                <h3>{placeDetails.name}</h3>
            </div>
            <div className="card-body">
                <h6 className="card-title">Latitude: {placeDetails.latitude} Longitude: {placeDetails.longitude}</h6>
                <em className="card-text">{placeDetails.visited? 'Visited: True': 'Visited: False'}</em>
                <p classNameName="card-text"> Description: {placeDetails.description}</p>
                <button className="btn btn-dark m-2" onClick={() => setShowMap(!showMap)}>Show Interactive Map</button>
                <button className="btn btn-dark m-2" onClick={(e) => handleEditClick(placeDetails)}>Edit Place</button>
                <button className="btn btn-dark m-2"  onClick={(e) => handleDeleteClick(placeDetails)}>Delete Place</button>
            </div>
            <div class="card-footer text-muted">
                
            </div>
        </div>


        </div>)}

        else{
            return(
                <div>
                    <h3>No Place Found</h3>
                </div>
            )
        }

}
