import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const styles = {
    width: "90vw",
    height: "50vh",
    margin: '10em',
    padding: '5em',
    border: "5px solid"
  
  };

const ReactMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-98.100000);
    const [lat, setLat] = useState(39.500000);
    const [zoom, setZoom] = useState(3.000);
    const [coords, setCoords] = useState({lng: '', lat: ''})
    const [markers, setMarkers] = useState([{ id: 1, lng: lng, lat: lat }])
useEffect(()=>{
    fetch('/places').then(r=>r.json()).then(data=>console.log(data))
}, [])
useEffect(()=>{
    fetch('/trips').then(r=>r.json()).then(data=>console.log(data))
}, [])

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
        
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(6));
                setLat(map.getCenter().lat.toFixed(6));
                setZoom(map.getZoom().toFixed(3));
            });
      

        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);



    return (
        <div>
            <div className="sidebar text center">
                Center Of Map: Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
            
        

        </div>
    );
};

export default ReactMap;