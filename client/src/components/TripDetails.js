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
                resp.json().then((data)=> setTripDetails(data))

            } else{
                resp.json().then(data=>console.log(data))
            }
        })
        
    
    }, []);
    
        

  

    function handleMap(){
        setShowMap(showMap=>!showMap)}
     
if(!tripDetails) return (null);

return (
        <div>
            {showMap?<TripMap tripDetails={tripDetails} place={place}/>: null}
            <div>
                <h2>{tripDetails.name}</h2>
                <h4>Start Date: {tripDetails.start_date} End Date: {tripDetails.end_date}</h4>
                <h6>Status: {tripDetails.taken? 'Taken' : 'Planned'}</h6>
                <p>{tripDetails.description}</p>


                <button onClick={handleMap}>{showMap? 'Hide Map' : 'Show Map'}</button>
            </div>
        </div>
    )}

