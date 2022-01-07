import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const styles = {
    width: "90vw",
    height: "50vh",
    margin: '10em',
    padding: '5em',
    border: "5px solid"
  
  };

export default function PlaceDetailMap({placeDetails}) {
    
    let colors = placeDetails.visited? 'black': 'red'
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [place, setPlace] = useState({})
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbW1vb3JlMjEiLCJhIjoiY2t4NTY4MmxkMjE3MTJ1bXI0c2hkcWF4MCJ9.4mGlkslBlwc6tAmqbmUuoA';;
        const initializeMap = ({ setMap, mapContainer, placeDetails }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [-98.100000, 39.500000],
                zoom: 3.000
            });
            const placelocation = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false

            });

            map.addControl(placelocation, 'top-right')

            map.on("load", () => {
                setMap(map);
                map.resize();
              
            });
            
          

        };
        fetch(`/places/${placeDetails.id}`)
        .then(r => r.json())
        .then(data => {
          console.log(data)
          setPlace(data)
       
  
        })
    if(place.latitude){
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h6>${place.name}</h6>`
            );
        if (place.visited) {
            new mapboxgl.Marker({ color: 'green', offset: [0, -50 / 2] })
              .setLngLat([place.longitude, place.latitude])
              .setPopup(popup)
              .addTo(map)
          }
          else if (!place.visted) {
            new mapboxgl.Marker({ color: 'red', offset: [0, -50 / 2] })
              .setLngLat([place.longitude, place.latitude])
              .setPopup(popup)
              .addTo(map)
    
          }
    }
       

      



        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);





    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
         
        </div>
    )
}
