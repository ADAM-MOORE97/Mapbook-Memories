import React, {useEffect, useState, useRef} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import TripMap from './TripMap';



export default function TripDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [tripDetails, setTripDetails] = useState();
    const [showMap, setShowMap] = useState(false)
    const [place, setPlace] = useState({})



    useEffect(()=>{
        fetch(`/trips/${params.id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json().then((data)=> {
                    console.log(data)
                    setTripDetails(data)
                fetch(`/places/${data.place_id}`)
            .then(r=>r.json())
        .then(data=>setPlace(data))})

            } else{
                resp.json().then(data=>console.log(data))
            }
        })
        
    
    }, []);
    function handleDeleteClick() {
        const del = window.confirm("Delete Trip? All images will also be deleted!");
  
      if(del === true){
          fetch(`/trips/${params.id}`, {
        method: "DELETE",
      })
      .then(r=>r.json())
      .then(data=> console.log(data))
      .catch(data =>console.log(data.errors))
      navigate('/trips/collection')
      
      }
      else{console.log("Delete canceled")}}
        

  

    function handleMap(){
        setShowMap(showMap=>!showMap)}
     
if(!tripDetails) return (null);

return (
        <div>
            {showMap?<TripMap tripDetails={tripDetails} place={place}/>: null}
            <div>
                <h2>Title:{tripDetails.name}</h2>
                <h4>Start Date: {tripDetails.start_date} End Date: {tripDetails.end_date}</h4>
                <h6>Status: {tripDetails.taken? 'Taken' : 'Planned'}</h6>
                {place.visited? <em> Location Status: You've been here before!</em>:<em>Location Status: A new place awaits!</em>}
                <p>{tripDetails.description}</p>
                {tripDetails.taken? tripDetails.attachment_urls.map((image)=><img src={image} width={200} height={250}></img>): 'Trip Planned, No Pictures Yet'}
                <button onClick={handleMap}>{showMap? 'Hide Map' : 'Show Map'}</button>
                <button onClick={(e)=>handleDeleteClick(tripDetails)}>Delete Trip</button>
                <button onClick={()=>navigate(`/trips/${tripDetails.id}/edit`)}>Edit Trip Info</button>
            </div>
        </div>
    )}

