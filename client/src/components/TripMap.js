import React, {useEffect, useState, useRef} from 'react'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const showstyles = {
    width: "100vw",
    height: "50vh",
     display: 'block'

}

export default function TripMap({place}) {
    
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
   
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
             
            let popup = new mapboxgl.Popup({ offset: 45 })
            if(place){
                popup.setHTML(
                    `<h6> Location: ${place.name}</h6>`
                )
            }
             {place.visited? new mapboxgl.Marker({ color: 'green',anchor: 'bottom' })
         .setLngLat([place.longitude, place.latitude])
         .setPopup(popup)
         .addTo(map) : new mapboxgl.Marker({ color: 'red',anchor: 'bottom' })
         .setLngLat([place.longitude, place.latitude])
         .setPopup(popup)
         .addTo(map)}
 
         };

         if (!map) initializeMap({ setMap, mapContainer });
    }, [map])

    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={showstyles} /> 
        </div>
    )
}
