import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlaceDetailMap from "./PlaceDetailMap";


export default function PlaceDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [placeDetails, setPlaceDetails] = useState();
    const [showMap, setShowMap] = useState(false)


    useEffect(()=>{
        fetch(`/places/${params.id}`)
        .then((resp)=>{
            if (resp.ok){
                resp.json().then((data)=> setPlaceDetails(data))
            } else {
                resp.json().then(data=>console.log(data.errors[0]))
            }
        })
        
    },[])
    console.log(placeDetails)

if(!placeDetails){
    navigate('/')
}
  


 

function handleEditClick(placeDetails) {
    navigate(`/places/${placeDetails.id}/edit`)
  }
 function handleDeleteClick() {
      const del = window.confirm("Delete Place?");

    if(del === true){
        fetch(`/places/${params.id}`, {
      method: "DELETE",
    })
    .then(r=>r.json())
    .then(data=> console.log(data))
    .catch(data =>console.log(data.errors))
    navigate('/places/collection')
    
    }
    else{console.log("Delete canceled")}}
;

    return (
        <div>
            
            {placeDetails? <div>
                {showMap? <PlaceDetailMap placeDetails={placeDetails}/> : null}
            <h3>{placeDetails.name}</h3>
            <h6>Latitude: {placeDetails.latitude} Longitude: {placeDetails.longitude}</h6>
            <em>{placeDetails.visited? 'Visited: True': 'Visited: False'}</em>
            <p>{placeDetails.description}</p>
            <button onClick={()=>setShowMap(!showMap)}>Show Interactive Map</button>
            <button onClick={(e)=>handleEditClick(placeDetails)}>Edit Place</button>
            <button onClick={(e)=>handleDeleteClick(placeDetails)}>Delete Place</button>
            </div> : <h3>Place Not Found</h3>}
          

        </div>
    )
}
