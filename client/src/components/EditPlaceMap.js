import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
const styles = {
    width: "80vw",
    height: "50vh",
    margin: '10em',
    border: "5px solid"

};

export default function EditPlaceMap({ setPlaceData, placeData }) {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [place, setPlace] = useState(placeData)
    const [showMarker, setShowMarker] = useState(false)



    useEffect(() => {
        console.log(placeData)
        mapboxgl.accessToken = process.env.REACT_APP_MAP_API;;
        const initializeMap = ({ setMap, mapContainer, placeData }) => {
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
            map.on('click', (coords) => {

                setPlaceData({ latitude: coords.lngLat.lat.toFixed(6), longitude: coords.lngLat.lng.toFixed(6) })

            })


        };
        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    const marker = () => {
        console.log(placeData)
        let marker = new mapboxgl.Marker({ color: 'black', draggable: true, })
       if(!showMarker){
            marker.setLngLat([placeData.longitude, placeData.latitude])
            .addTo(map)}
      marker.on('dragend', (e) => {
            
            let lngLat = e.target.getLngLat();
            setPlaceData({ latitude: lngLat['lat'], longitude: lngLat['lng'] })
            
        })
        
      setShowMarker(true)
    }


    return (
        <div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
            <button onClick={() => marker()}>Show Editable Marker</button>
        </div>
    )
}
