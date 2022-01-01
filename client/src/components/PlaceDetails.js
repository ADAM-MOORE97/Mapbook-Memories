import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';



const styles = {
    width: "100vw",
    height: "50vh",

};

export default function PlaceDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [placeDetails, setPlaceDetails] = useState();
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

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
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbW1vb3JlMjEiLCJhIjoiY2t4NTY4MmxkMjE3MTJ1bXI0c2hkcWF4MCJ9.4mGlkslBlwc6tAmqbmUuoA';;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [-98.100000, 39.500000],
                zoom: 3.000
            });
            const directions = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false

            });

            map.addControl(directions, 'top-right')

            map.on("load", () => {
                setMap(map);
                map.resize();
            });

        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

const handleMarker = ()=>{
    {placeDetails.visited?  new mapboxgl.Marker({ color: 'black',anchor: 'bottom' })
            .setLngLat([placeDetails.longitude, placeDetails.latitude])
            .addTo(map):new mapboxgl.Marker({ color: 'red',anchor: 'bottom' })
            .setLngLat([placeDetails.longitude, placeDetails.latitude])
            .addTo(map)}
}
function handleEditClick(placeDetails) {
    navigate(`/places/${placeDetails.id}/edit`)
  }

    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
            {placeDetails? <div>
            <h3>{placeDetails.name}</h3>
            <h6>Latitude: {placeDetails.latitude} Longitude: {placeDetails.longitude}</h6>
            <p>{placeDetails.description}</p>
            <button onClick={handleMarker}>Show Location Marker</button>
            <button onClick={(e)=>handleEditClick(placeDetails)}>Edit Place</button>
            </div> : null}
          

        </div>
    )
}
